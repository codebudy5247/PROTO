"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CircleCheckBig } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  totalPrice: number;
  username: string;
};
const PaymentConfirmationModel = ({
  showModal,
  setShowModal,
  totalPrice,
  username,
}: Props) => {
  const router = useRouter();
  const closeModal = () => {
    setShowModal(false);
    router.push("/orders");
  };

  return (
    <Dialog open={showModal} onOpenChange={closeModal}>
      <DialogContent>
        <div className="flex flex-col items-center justify-center gap-2 px-7">
          <CircleCheckBig color="green" size={40} />
          <h6 className="text-2xl font-semibold">
            Payment complete.
          </h6>
          <h6 className="text-slategray text-center">
            We have recieved your ₹{totalPrice} payment, {username}
          </h6>
          <p className="text-slategray text-center">
            We have sent you an email with all this details of your order.
          </p>

          <Button onClick={() => router.push("/orders")} variant="default">
            Go to Orders
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentConfirmationModel;
