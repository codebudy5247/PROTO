"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { OrderEvent } from "@prisma/client";

type Props = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  event: OrderEvent[];
};
const OrderTrackModel = ({ showModal, setShowModal, event }: Props) => {
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <Dialog open={showModal} onOpenChange={closeModal}>
      <DialogContent>
        <div className="flex flex-col items-center justify-center gap-2 px-7">
          OrderTrackModel
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderTrackModel;
