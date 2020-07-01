import Draw from "ol/interaction/Draw";

export function createMapInteraction(source, type) {
  return new Draw({
    source: source,
    type: type
  });
}
