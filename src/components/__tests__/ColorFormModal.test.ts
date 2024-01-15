import { beforeEach, describe, expect, it, vi } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import { useTileStore } from '../../stores';
import type { Tile } from '../../typings';

import ColorFormModal from '../ColorFormModal.vue';

describe('ColorFormModal', () => {
  let wrapper: VueWrapper;

  const testTile: Tile = { id: '1', color: '#FFFFFF' };

  beforeEach(() => {
    wrapper = mount(ColorFormModal, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              tiles: {
                editedTile: testTile,
                tiles: [testTile],
              },
            },
          }),
        ],
      },
    });
  });

  it('renders properly', () => {
    expect(wrapper).toBeTruthy();
  });

  it('calls closeEditMode action after close button click', () => {
    const store = useTileStore();
    const closeButton = wrapper.find('[test-id="closeButton"]');
    closeButton.trigger('click');

    expect(store.closeEditMode).toHaveBeenCalled();
  });

  it('sets color value initially', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((wrapper.vm as any).color).toBe('#FFFFFF');
  });

  it('does not show error message when color is valid', () => {
    const errorMessage = wrapper.find('[test-id="errorMessage"]');

    expect(errorMessage.exists()).toBe(false);
  });

  it('shows correct error message when hex input field is empty', async () => {
    const hexInput = wrapper.find('[test-id="hexInput"]');
    hexInput.setValue('');
    hexInput.trigger('blur');

    await wrapper.vm.$nextTick();

    const errorMessage = wrapper.find('[test-id="errorMessage"]');

    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Hex color should not be empty');
  });

  it('shows correct error message when hex input length is less than 7', async () => {
    const hexInput = wrapper.find('[test-id="hexInput"]');
    hexInput.setValue('#BABA');
    hexInput.trigger('blur');

    await wrapper.vm.$nextTick();

    const errorMessage = wrapper.find('[test-id="errorMessage"]');

    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Hex color should be 7 characters long');
  });

  it('shows correct error message when hex input length is more than 7', async () => {
    const hexInput = wrapper.find('[test-id="hexInput"]');
    hexInput.setValue('#BABABABA');
    hexInput.trigger('blur');

    await wrapper.vm.$nextTick();

    const errorMessage = wrapper.find('[test-id="errorMessage"]');

    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Hex color should be 7 characters long');
  });

  it('shows correct error message when hex input not starts with #', async () => {
    const hexInput = wrapper.find('[test-id="hexInput"]');
    hexInput.setValue('BABABAB');
    hexInput.trigger('blur');

    await wrapper.vm.$nextTick();

    const errorMessage = wrapper.find('[test-id="errorMessage"]');

    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Hex color should start with #');
  });

  it('shows correct error message when hex input field has not allowed characters', async () => {
    const hexInput = wrapper.find('[test-id="hexInput"]');
    hexInput.setValue('#BABABT');
    hexInput.trigger('blur');

    await wrapper.vm.$nextTick();

    const errorMessage = wrapper.find('[test-id="errorMessage"]');

    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Invalid hex color format');
  });

  it('calls updateTile action after change button click, when color is valid', () => {
    const store = useTileStore();

    const changeButton = wrapper.find('[test-id="changeButton"]');
    changeButton.trigger('click');

    expect(store.updateTile).toHaveBeenCalled();
  });

  it('calls closeEditMode action after change button click, when color is valid', () => {
    const store = useTileStore();

    const changeButton = wrapper.find('[test-id="changeButton"]');
    changeButton.trigger('click');

    expect(store.closeEditMode).toHaveBeenCalled();
  });

  it('does not call updateTile action after change button click, when color is invalid', async () => {
    const store = useTileStore();

    const hexInput = wrapper.find('[test-id="hexInput"]');
    hexInput.setValue('');
    hexInput.trigger('blur');

    await wrapper.vm.$nextTick();

    const changeButton = wrapper.find('[test-id="changeButton"]');
    changeButton.trigger('click');

    expect(store.updateTile).not.toHaveBeenCalled();
  });

  it('does not call closeEditMode action after change button click, when color is invalid', async () => {
    const store = useTileStore();

    const hexInput = wrapper.find('[test-id="hexInput"]');
    hexInput.setValue('');
    hexInput.trigger('blur');

    await wrapper.vm.$nextTick();

    const changeButton = wrapper.find('[test-id="changeButton"]');
    changeButton.trigger('click');

    expect(store.closeEditMode).not.toHaveBeenCalled();
  });
});
