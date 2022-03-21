/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function NotificationPopup({
  onPressAnyOption,
  message,
  title,
  okMessage,
  cancelMessage,
  Icon,
  show = true,
  hideOption,
}) {
  const [open, setOpen] = useState(true);

  const okButtonRef = useRef(null);

  const onclick = async (ok) => {
    await onPressAnyOption(ok);
    // setOpen(false);
  };

  const hidePopup = async () => {
    hideOption ? hideOption() : await onPressAnyOption(false);
    // setOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-50 overflow-y-auto inset-0 "
        initialFocus={okButtonRef}
        open={open}
        onClose={() => {}}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                    <Dialog.Title
                      as="h3"
                      className="text-xl leading-6 font-bold text-gray-600 capitalize font-mono"
                    >
                      {title}
                    </Dialog.Title>
                    <div className="mt-2 capitalize text-sm font-semibold ">
                      <p className="text-sm text-gray-400">{message}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3  flex space-x-2 text-sm text-white">
                {show && (
                  <button
                    type="button"
                    className="rounded-md border shadow-sm px-4 py-2 bg-gray-300 text-base  focus:outline-none flex-1"
                    onClick={async () => {
                      await onclick(false);
                    }}
                  >
                    {cancelMessage}
                  </button>
                )}
                <button
                  type="button"
                  ref={okButtonRef}
                  className=" rounded-md border  shadow-sm px-4 py-2 bg-secondary text-heading text-base focus:outline-none  flex-1"
                  onClick={async () => {
                    await onclick(true);
                  }}
                >
                  {okMessage}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
