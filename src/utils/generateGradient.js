function generateGradient(types, typeColors) {
  if (types.length === 1) {
    return typeColors[types[0].type.name].background;
  }

  const color1 = typeColors[types[0].type.name].background;
  const color2 = typeColors[types[1].type.name].background;
  return `linear-gradient(90deg, ${color1} 50%, ${color2} 50%)`;
}

export default generateGradient;
