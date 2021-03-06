import React, { useEffect } from "react";

export default function SearchBox(props) {
  const mapApi = props.mapApi;
  const map = props.map;

  let searchBox = null;

  useEffect(() => {
    if (map || mapApi) {
      searchBox = new mapApi.places.SearchBox(refs.searchInput);
      searchBox.addListener("places_changed", onPlacesChanged);
      searchBox.bindTo("bounds", map);
    }
  });

  const refs = {};
  const onSearchBoxMounted = (ref) => {
    refs.searchInput = ref;
  };

  function onPlacesChanged() {
    const selected = searchBox.getPlaces();
    const { 0: place } = selected;
    if (!place.geometry) return;
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    props.addPlace(selected);
  }

  function clearSearchBox() {
    refs.searchInput.value = "";
  }

  return (
    <input
      ref={onSearchBoxMounted}
      type="text"
      onFocus={clearSearchBox}
      placeholder="我的位置"
      className="google-search-input-style"
    />
  );
}
