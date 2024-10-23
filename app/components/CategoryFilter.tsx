"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import Products from "./Products";
import { BACKEND_URL } from "@/lib/constant";
import FeaturedSlider from "./FeaturedSlider";
import PaginationUI from "./Pagination";

interface SortOption {
  name: string;
  href: string;
  current: boolean;
}

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  categoryName: string;
}

const sortOptions: SortOption[] = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function CategoryFilter() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  interface Category {
    id: string;
    name: string;
  }

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    const response = await fetch(`${BACKEND_URL}/products?limit=8&page=1`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setProducts(data);
    setLoading(false);
  };
  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch(`${BACKEND_URL}/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setCategories(data);
    };
    Promise.all([getCategories(), getProducts()]);
  }, []);

  useEffect(() => {
    const getProductbyCategories = async () => {
      if (selectedCategories.length === 0) {
        return getProducts();
      }
      const query = selectedCategories.join(",");
      try {
        const response = await fetch(
          `${BACKEND_URL}/products/category/search?categories=${query}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products by categories:", error);
      }
    };
    getProductbyCategories();
  }, [selectedCategories]);

  const handleCheckboxChange = (categoryName: string) => {
    setSelectedCategories((prevSelectedCategories) => {
      console.log("Previous selected categories:", prevSelectedCategories);
      let updatedCategories;
      if (prevSelectedCategories.includes(categoryName)) {
        updatedCategories = prevSelectedCategories.filter(
          (category) => category !== categoryName
        );
      } else {
        updatedCategories = [...prevSelectedCategories, categoryName];
      }
      console.log("Updated selected categories:", updatedCategories);
      return updatedCategories;
    });
  };

  return (
    <div className="bg-white rounded-md">
      {!loading && (
        <div>
          {/* Mobile filter dialog */}
          <Dialog
            open={mobileFiltersOpen}
            onClose={setMobileFiltersOpen}
            className="relative z-40 lg:hidden"
          >
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 z-40 flex">
              <DialogPanel
                transition
                className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
              >
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  <Disclosure
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          Category
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {categories.map((category) => (
                          <div
                            key={category.id}
                            className="flex items-center"
                          >
                            <input
                              type="checkbox"
                              id={`checkbox-${category.name}`}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              checked={selectedCategories.includes(
                                category.name
                              )}
                              onChange={() =>
                                handleCheckboxChange(category.name)
                              }
                            />
                            <label
                              htmlFor={`checkbox-${category.name}`}
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              {category.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                </form>
              </DialogPanel>
            </div>
          </Dialog>

          <main className="mx-auto min-w-full px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline min-w-full justify-between border-b border-gray-200 pb-6 pt-4">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                New Arrivals
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <MenuItem key={option.name}>
                          <a
                            href={option.href}
                            className={classNames(
                              option.current
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              "block px-4 py-2 text-sm data-[focus]:bg-gray-100"
                            )}
                          >
                            {option.name}
                          </a>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>

                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <form className="hidden lg:block">
                  <Disclosure
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          Category
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`checkbox-${category.name}`}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              checked={selectedCategories.includes(
                                category.name
                              )}
                              onChange={() =>
                                handleCheckboxChange(category.name)
                              }
                            />
                            <label 
                            htmlFor={`checkbox-${category.name}`}
                            className="ml-3 text-sm text-gray-600">
                              {category.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                </form>

                {/* Product grid */}

                <div className="lg:col-span-3 col-span-2">
                  <div className="bg-white">
                    <div className="ml-4 mb-7 overflow-hidden rounded-xl">
                    <FeaturedSlider />

                    </div>
                    <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8 border shadow-md rounded-lg">
                      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Products
                      </h2>
                      <Products products={products} />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      )}
      <PaginationUI />
    </div>
  );
}
