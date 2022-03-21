import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function LoadingPopup({
  Icon,
  isLoading = true,
  label = "Please Wait While Fetching Your Data",
}) {
  const randomRef = useRef(null);

  return (
    <Transition.Root show={isLoading} as={Fragment}>
      <div className="fixed z-50 overflow-y-auto inset-0 ">
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
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
            <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full w-3/4">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Icon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      <div
                        className=" justify-center p-5 inline-flex rounded-full  space-x-3 loader"
                        ref={randomRef}
                      >
                        <div className="w-2 p-2 rounded-full bg-gray-800 animate-bounce delay-75"></div>
                        <div className="w-2 p-2 rounded-full bg-gray-800 animate-bounce delay-100"></div>
                        <div className="w-2 p-2 rounded-full bg-gray-800 animate-bounce delay-150"></div>
                      </div>
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{label}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </div>
    </Transition.Root>
  );
}
