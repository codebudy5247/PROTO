"use client";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import AddAddressForm from "./AddAddressForm";
import toast from "react-hot-toast";

interface Props {
  handleNext: () => void;
}
const ShippingAddress = ({ handleNext }: Props) => {
  const { data } = api.auth.me.useQuery();
  const [showAddressForm, setShowAddressForm] = useState<boolean>(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    data?.user?.defaultShippingAddress ?? null,
  );

  const { data: addressList, refetch: refetchAddressList } =
    api.user.list.useQuery();

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAddressId(event.target.value);
  };

  const onClickAddAddress = () => {
    setShowAddressForm(true);
  };

  const { mutate: updateAddressFn } = api.user.update.useMutation({
    onSuccess: async (data) => {
      await refetchAddressList();
      handleNext();
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error.message);
    },
  });

  const { mutate: deleteAddressFn } = api.user.delete.useMutation({
    onSuccess: async (data) => {
      await refetchAddressList();
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error.message);
    },
  });

  const updateDefaultAddressHandler = () => {
    if (data?.user?.defaultShippingAddress === selectedAddressId) {
      handleNext();
    } else {
      updateAddressFn({ defaultShippingAddress: selectedAddressId! });
    }
  };

  const handleDeleteAddress = (id: string) => {
    deleteAddressFn({ addressId: id });
  };

  // useEffect(() => {
  //   if (!selectedAddressId) {
  //     setShowAddressForm(true);
  //   }
  // }, [selectedAddressId]);

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mx-auto mt-4 max-w-2xl md:mt-8">
        <div className="bg-white shadow">
          <div className="px-4 py-2 sm:px-8 sm:py-5">
            <div className="flex cursor-pointer justify-between">
              <p className="text-lg font-medium">Shipping Address</p>
              <p
                onClick={onClickAddAddress}
                className="text-lg font-medium hover:underline"
              >
                Add new Address
              </p>
            </div>

            {showAddressForm ? (
              <AddAddressForm
                refetchAddressList={refetchAddressList}
                setShowAddressForm={setShowAddressForm}
              />
            ) : (
              <>
                {addressList && addressList?.length > 0 && (
                  <div className="mt-5 grid gap-6">
                    {addressList?.map((address) => (
                      <div key={address.id} className="relative">
                        <input
                          className="peer hidden"
                          id={address.id}
                          type="radio"
                          name="address"
                          value={address.id}
                          checked={selectedAddressId === address.id}
                          onChange={handleRadioChange}
                        />
                        <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-gray-700"></span>
                        <label
                          className="flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50"
                          htmlFor={address.id}
                        >
                          <div className="ml-5">
                            <p className="text-lg leading-6 text-slate-500">
                              {address.formattedAddress}
                            </p>
                            <p
                              onClick={() => handleDeleteAddress(address.id)}
                              className="text-md font-medium text-red-500 underline"
                            >
                              Delete
                            </p>
                          </div>
                        </label>
                      </div>
                    ))}
                    {addressList?.length > 0 && (
                      <button
                        onClick={updateDefaultAddressHandler}
                        className="mb-4 mt-2 w-fit rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
                      >
                        Use this address
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;
