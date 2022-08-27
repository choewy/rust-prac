export const setEntityData: <Entity>(
  entity: Entity,
  ...dataSetArray: Partial<Entity>[]
) => Entity = (entity, ...dataSetArray) => {
  dataSetArray.forEach((dataSet) => {
    Object.entries(dataSet).forEach(([key, value]) => {
      entity[key] = value;
    });
  });
  return entity;
};
