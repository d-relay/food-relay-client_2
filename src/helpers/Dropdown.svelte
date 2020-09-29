<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte'
  import { createPopper } from '@popperjs/core'
  const noop = () => {}
  export let open = false
  export let flip = true
  export let placement = 'bottom-start'
  export let displayStatic = false
  export let keyboard = true
  export let insideClick = false
  export let closeOnOutsideClick = true
  export let offset = [0, 2]
  export let triggerElement: Element
  export let onOpened = noop
  export let onClosed = noop
  export let labelledby: string = ''
  let _menuItem: any
  let _popperInstance: any
  let _dropdownClass: string
  let _keyboardEvent: any
  let _outsideClickEvent: any
  let _triggerEvent: any
  let _items: any[] = []
  const ESCAPE_KEY = 'Escape'
  const ARROW_UP_KEY = 'ArrowUp'
  const ARROW_DOWN_KEY = 'ArrowDown'

  const REGEXP_KEYDOWN = new RegExp(
    `${ARROW_UP_KEY}|${ARROW_DOWN_KEY}|${ESCAPE_KEY}`
  )

  const SELECTOR_VISIBLE_ITEMS = '.dropdown__item:not(.disabled):not(:disabled)'

  const placementClassMap = {
    top: 'dropup',
    bottom: 'dropdown',
    right: 'dropright',
    left: 'dropleft',
  }
  $: {
    if (open) {
      onDropdownOpend()
    } else {
      onDropdownClosed()
    }
  }
  $: {
    // @ts-ignore
    _dropdownClass = placementClassMap[placement.split('-')[0]]
  }
  function attachEvent(target: any, ...args: any) {
    target.addEventListener(...args)
    return {
      remove: () => target.removeEventListener(...args),
    }
  }
  function menuClick() {
    if (!insideClick) {
      open = false
    }
  }
  async function _createPopperInstance() {
    await tick()
    _popperInstance = createPopper(triggerElement, _menuItem, {
      // @ts-ignore
      placement,
      modifiers: [
        {
          name: 'flip',
          enabled: flip,
        },
        {
          name: 'offset',
          options: {
            offset,
          },
        },
        {
          name: 'preventOverflow',
          options: {
            altBoundary: true,
          },
        },
      ],
    })
  }
  function _isVisible(element: HTMLElement) {
    if (!element) {
      return false
    }
    if (
      element.style &&
      element.parentNode &&
      (element.parentNode as HTMLElement).style
    ) {
      const elementStyle = getComputedStyle(element)
      const parentNodeStyle = getComputedStyle(element.parentNode as Element)
      return (
        elementStyle.display !== 'none' &&
        parentNodeStyle.display !== 'none' &&
        elementStyle.visibility !== 'hidden'
      )
    }
    return false
  }
  async function getItems() {
    await tick()
    const nodeList = _menuItem.querySelectorAll(SELECTOR_VISIBLE_ITEMS)
    _items = [...nodeList].filter(_isVisible)
  }
  function _keyBoradEvents() {
    if (keyboard) {
      _keyboardEvent = attachEvent(
        document,
        'keydown',
        (event: KeyboardEvent) => {
          if (
            !/input|textarea/i.test((event.target as Element).tagName) &&
            REGEXP_KEYDOWN.test(event.key)
          ) {
            event.preventDefault()
            event.stopPropagation()
            if (event.key === ESCAPE_KEY) {
              open = false
            }
            if (!_items.length) {
              return
            }
            let index = _items.indexOf(event.target)
            if (event.key === ARROW_UP_KEY && index > 0) {
              // Up
              index--
            }
            if (event.key === ARROW_DOWN_KEY && index < _items.length - 1) {
              // Down
              index++
            }
            // index is -1 if the first keydown is an ArrowUp
            index = index === -1 ? 0 : index
            _items[index].focus()
          }
        }
      )
    }
  }
  function _outsideEventAttacher() {
    if (closeOnOutsideClick) {
      _outsideClickEvent = attachEvent(
        document,
        'click',
        (event: MouseEvent) => {
          const buttonTarget = (event.target as Element).closest(
            '[data-toggle="dropdown"]'
          )
          if (
            buttonTarget !== triggerElement &&
            event.target !== _menuItem &&
            !_menuItem.contains(event.target)
          ) {
            open = false
          }
        }
      )
    }
  }
  async function onDropdownOpend() {
    getItems()
    _keyBoradEvents()
    _outsideEventAttacher()
    if (!displayStatic) {
      _createPopperInstance()
    }
    onOpened()
  }
  function _commonExit() {
    if (_keyboardEvent) {
      _keyboardEvent.remove()
    }
    if (_outsideClickEvent) {
      _outsideClickEvent.remove()
    }
    _destroyPopperInstance()
  }
  function onDropdownClosed() {
    _commonExit()
    onClosed()
  }
  function _destroyPopperInstance() {
    if (_popperInstance) {
      _popperInstance.destroy()
      _popperInstance = null
    }
  }
  onMount(async () => {
    await tick()
    _triggerEvent = attachEvent(
      triggerElement,
      'click',
      (event: MouseEvent) => {
        // event.stopPropagation();
        open = !open
      }
    )
  })
  onDestroy(() => {
    _commonExit()
    _triggerEvent?.remove()
  })
</script>

<style>
  .dropdown__menu {
    @apply origin-top-right;
    @apply w-48;
    @apply rounded-md;
    @apply shadow-lg;
  }
</style>

<div class={_dropdownClass}>
  <slot />
  {#if open}
    <div
      class="dropdown__menu"
      bind:this={_menuItem}
      on:click={menuClick}
      aria-labelledby={labelledby}>
      <slot name="DropdownMenu" />
    </div>
  {/if}
</div>
