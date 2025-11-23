import { describe, it, expect } from 'vitest';
import { defineComponent, h, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { useThemeClasses } from '../useThemeClasses';

// Create a test component that uses the composable
const TestComponent = defineComponent({
  setup() {
    const themeClasses = useThemeClasses();
    return { themeClasses };
  },
  template: '<div></div>',
});

// Create a wrapper that provides theme context
const createWrapper = (nightModeValue = false) => {
  const ThemeProvider = defineComponent({
    provide() {
      return {
        theme: {
          nightMode: ref(nightModeValue),
        },
      };
    },
    setup() {
      return () => h(TestComponent);
    },
  });

  return mount(ThemeProvider);
};

describe('useThemeClasses', () => {
  it('should return valid CSS classes for light mode', () => {
    const wrapper = createWrapper(false);
    const { themeClasses } = wrapper.findComponent(TestComponent).vm;

    // Check that classes are returned
    expect(themeClasses.classes.bg()).toBe('bg-white');
    expect(themeClasses.classes.text()).toBe('text-gray-800');
    expect(themeClasses.isDark.value).toBe(false);
  });

  it('should return dark mode classes when night mode is enabled', () => {
    const wrapper = createWrapper(true);
    const { themeClasses } = wrapper.findComponent(TestComponent).vm;

    // Check that dark mode is enabled
    expect(themeClasses.isDark.value).toBe(true);
    expect(themeClasses.classes.bg()).toBe('bg-slate-800');
    expect(themeClasses.classes.text()).toBe('text-gray-100');
  });
});
