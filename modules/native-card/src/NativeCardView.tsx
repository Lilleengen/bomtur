import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

export type Props = {
  text: string;
}

const NativeView: React.ComponentType<Props> =
  requireNativeViewManager('NativeCard');

export default function NativeCardView(props: Props) {
  return <NativeView {...props} />;
}
