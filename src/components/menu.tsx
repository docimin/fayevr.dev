'use client'
import { Fragment, Key, useState } from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'

const items = [
  { id: 1, name: '>about', category: 'faye', url: '/about' },
  { id: 2, name: '>projects', category: 'faye', url: '/projects' },
  {
    id: 3,
    name: '#suggestions-bot',
    category: 'Projects',
    url: '/projects/suggestions-bot',
  },
  { id: 4, name: '#alyx-bot', category: 'Projects', url: '/projects/alyx-bot' },
  {
    id: 5,
    name: '?github',
    category: 'Help',
    url: 'https://github.com/docimin/',
  },
  { id: 6, name: 'doom', category: 'Spooky!', url: '/doom' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function MenuComponent({ open, setOpen }) {
  const [query, setQuery] = useState('')

  const filteredItems =
    query === ''
      ? []
      : items.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase())
        })

  const groups = filteredItems.reduce((groups, item) => {
    return {
      ...groups,
      [item.category]: [...(groups[item.category] || []), item],
    }
  }, {})

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => setQuery('')}
      appear
    >
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox onChange={(item: any) => (window.location = item.url)}>
                <div className="relative">
                  <i className="fa-solid fa-arrow-left pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"></i>
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>

                {query === '' && (
                  <div className="border-t border-gray-100 px-6 py-14 text-center text-sm sm:px-14">
                    <i className="fa-solid fa-magnifying-glass fa-2xl mx-auto h-6 w-6 text-gray-400"></i>
                    <p className="mt-4 font-semibold text-gray-900">
                      Search for pages and other stuff..
                    </p>
                    <p className="mt-2 text-gray-500">
                      Quickly access pages on this site. Keep a lookout for
                      secrets :)
                    </p>
                  </div>
                )}

                {filteredItems.length > 0 && (
                  <Combobox.Options
                    static
                    className="max-h-80 scroll-pb-2 scroll-pt-11 space-y-2 overflow-y-auto pb-2"
                  >
                    {Object.entries(groups).map(([category, items]: any) => (
                      <li key={category}>
                        <h2 className="bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-900">
                          {category}
                        </h2>
                        <ul className="mt-2 text-sm text-gray-800">
                          {items.map((item: { id: Key; name: string }) => (
                            <Combobox.Option
                              key={item.id}
                              value={item}
                              className={({ active }) =>
                                classNames(
                                  'cursor-default select-none px-4 py-2',
                                  active && 'bg-indigo-600 text-white'
                                )
                              }
                            >
                              {item.name.replace(/^[#>?]/, '')}
                            </Combobox.Option>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </Combobox.Options>
                )}

                {query !== '' && filteredItems.length === 0 && (
                  <div className="border-t border-gray-100 px-6 py-14 text-center text-sm sm:px-14">
                    <i className="fa-solid fa-arrow-left mx-auto h-6 w-6 text-gray-400"></i>
                    <p className="mt-4 font-semibold text-gray-900">
                      No results found
                    </p>
                    <p className="mt-2 text-gray-500">
                      We couldn’t find anything with that term. Please try
                      again.
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap items-center bg-gray-50 px-4 py-2.5 text-xs text-gray-700">
                  Type{' '}
                  <kbd
                    className={classNames(
                      'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2 border-indigo-600 text-indigo-600'
                    )}
                  >
                    #
                  </kbd>{' '}
                  <span className="sm:hidden">for projects,</span>
                  <span className="hidden sm:inline">to view projects,</span>
                  <kbd
                    className={classNames(
                      'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2 border-gray-400 text-gray-900'
                    )}
                  >
                    &gt;
                  </kbd>{' '}
                  for pages, and{' '}
                  <kbd
                    className={classNames(
                      'mx-1 flex h-5 w-5 items-center justify-center rounded border border-gray-400 bg-white font-semibold sm:mx-2'
                    )}
                  >
                    ?
                  </kbd>{' '}
                  for help.
                </div>
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
