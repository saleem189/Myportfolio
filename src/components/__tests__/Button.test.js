import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from '../helpers/Button.vue';

describe('Button Component', () => {
  it('renders with default props', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me',
      },
    });

    expect(wrapper.text()).toBe('Click me');
    expect(wrapper.element.tagName).toBe('BUTTON');
  });

  it('renders different variants', () => {
    const variants = ['default', 'primary', 'secondary', 'warning', 'danger'];

    variants.forEach((variant) => {
      const wrapper = mount(Button, {
        props: { variant },
        slots: { default: 'Test' },
      });
      expect(wrapper.exists()).toBe(true);
    });
  });

  it('renders different sizes', () => {
    const sizes = ['sm', 'md', 'lg'];

    sizes.forEach((size) => {
      const wrapper = mount(Button, {
        props: { size },
        slots: { default: 'Test' },
      });
      expect(wrapper.exists()).toBe(true);
    });
  });

  it('emits click event when clicked', async () => {
    const wrapper = mount(Button, {
      slots: { default: 'Click me' },
    });

    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it('does not emit click when disabled', async () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
      slots: { default: 'Click me' },
    });

    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeFalsy();
  });

  it('renders as anchor tag when tag prop is "a"', () => {
    const wrapper = mount(Button, {
      props: { tag: 'a', href: 'https://example.com' },
      slots: { default: 'Link' },
    });

    expect(wrapper.element.tagName).toBe('A');
    expect(wrapper.attributes('href')).toBe('https://example.com');
  });

  it('renders icon slots', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Button',
        'icon-left': '<span class="icon-left">←</span>',
        'icon-right': '<span class="icon-right">→</span>',
      },
    });

    expect(wrapper.html()).toContain('icon-left');
    expect(wrapper.html()).toContain('icon-right');
  });

  it('applies custom class', () => {
    const customClass = 'my-custom-class';
    const wrapper = mount(Button, {
      props: { customClass },
      slots: { default: 'Test' },
    });

    expect(wrapper.classes()).toContain(customClass);
  });

  it('shows disabled state visually', () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
      slots: { default: 'Disabled' },
    });

    expect(wrapper.classes()).toContain('opacity-50');
    expect(wrapper.classes()).toContain('cursor-not-allowed');
  });
});
