import createAllSidebars from './allSidebars';
import upperFirst from '../utils/upperFirst';

export default (ctx = {}, target = {}) => {
  const {
    primarySidebar,
    secondarySidebar,
    primaryGap,
    secondaryGap,
    secondaryWidth,
    primaryWidth,
  } = createAllSidebars(ctx, target);
  const getAffectedWidth = ({ primaryDisabled, secondaryDisabled } = {}) => {
    if (primaryDisabled) {
      return secondaryWidth;
    }
    if (secondaryDisabled) {
      return primaryWidth;
    }
    if (primaryWidth === '100%' && secondaryWidth === '100%') {
      return '100%';
    }
    if (primaryWidth !== '100%' && secondaryWidth !== '100%') {
      return `calc(100% - ${primarySidebar.width + secondarySidebar.width}px)`;
    }
    if (primaryWidth !== '100%' && secondaryWidth === '100%') {
      return primaryWidth;
    }
    if (secondaryWidth !== '100%' && primaryWidth === '100%') {
      return secondaryWidth;
    }
    return undefined;
  };
  return {
    getAffectedWidth,
    getStyle: ({ primaryDisabled, secondaryDisabled } = {}) => ({
      ...(!primaryDisabled && {
        [`margin${upperFirst(primarySidebar.anchor) || 'Left'}`]: primaryGap,
      }),
      ...(!secondaryDisabled && {
        [`margin${upperFirst(secondarySidebar.anchor) ||
          'Right'}`]: secondaryGap,
      }),
      width: getAffectedWidth({ primaryDisabled, secondaryDisabled }),
    }),
  };
};
