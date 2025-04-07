import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';

// Mapping SFSymbol names (iOS) to MaterialIcons (Android/Web)
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
};

/**
 * A cross-platform icon component using SFSymbols naming,
 * mapped to MaterialIcons on Android/web.
 */
export function IconSymbol({ name, size = 24, color, style }) {
  const iconName = MAPPING[name];

  if (!iconName) {
    console.warn(`Icon "${name}" not found in MAPPING`);
    return null;
  }

  return (
    <MaterialIcons
      color={color}
      size={size}
      name={iconName}
      style={style}
    />
  );
}
