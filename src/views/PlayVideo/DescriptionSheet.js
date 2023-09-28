import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import propTypes from 'prop-types';
import { useRef, useMemo, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DescriptionSheet = ({ children, top, open, onClose }) => {
  const insets = useSafeAreaInsets();

  const sheetRef = useRef(null);

  const snapPoints = useMemo(() => ['90%', '90%'], []);

  useEffect(() => {
    if (open) {
      sheetRef.current?.snapToIndex(0);
    } else {
      sheetRef.current?.close();
    }
  }, [open]);

  return (
    <>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose
        onClose={onClose}
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          {children}
        </BottomSheetScrollView>
      </BottomSheet>
    </>
  );
};

DescriptionSheet.propTypes = {
  children: propTypes.node,
  top: propTypes.number,
  open: propTypes.bool,
  onClose: propTypes.func,
};

export default DescriptionSheet;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  contentContainer: {
    paddingBottom: 16,
  },
});
