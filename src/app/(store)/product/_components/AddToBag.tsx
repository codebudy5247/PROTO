"use client";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import useCartStore from "@/hooks/useCart";
import useLocationStore from "@/hooks/useLocation";
import { useState } from "react";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  id: string;
}

const AddToBag = ({ id }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { size, color } = useCartStore((state) => state);
  const { updatePreviousLocation } = useLocationStore(
    (state) => state,
  );
  const [submitting, setSubmitting] = useState(false);

  const { data: session } = api.auth.me.useQuery();

  const { mutate: addToCartFn } = api.cart.addItem.useMutation({
    onMutate() {
      setSubmitting(true);
    },
    onSettled() {
      setSubmitting(false);
    },
    onSuccess: () => {
      toast.success("Item Added to Cart!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const addToCartHandler = () => {
    if (size && color) {
      if (session?.user) {
        addToCartFn({ productId: id, quantity: 1, size, color });
      } else {
        updatePreviousLocation(pathname)
        router.push("/signin");
      }
    } else {
      toast.error("Select size and color.");
    }
  };
  return (
    <Button
      disabled={submitting}
      variant="default"
      className="flex gap-1"
      onClick={addToCartHandler}
    >
      <ShoppingBag />
      {submitting ? "loading..." : "Add to bag"}
    </Button>
  );
};

export default AddToBag;
