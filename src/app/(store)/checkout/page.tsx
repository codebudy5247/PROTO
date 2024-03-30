"use client";
import { useEffect, useRef, useState } from "react";
import ShippingAddress from "./_components/ShippingAddress";
import Payment from "./_components/Payment";

interface Step {
  name: string;
  Component: React.FC;
}

const DefaultComponent: React.FC = () => <div>No component found</div>;

const CheckoutPage = () => {
  const CHECKOUT_STEPS: Step[] = [
    {
      name: "Shipping Info",
      Component: () => <ShippingAddress handleNext={handleNext} />,
    },
    {
      name: "Payment",
      Component: () => <Payment />,
    },
    {
      name: "Delivery",
      Component: () => <div> Your order has been delivered.</div>,
    },
  ];
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [margins, setMargins] = useState<{
    marginLeft: number;
    marginRight: number;
  }>({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const firstStepWidth = stepRef.current[0]?.offsetWidth;
    const lastStepWidth =
      stepRef.current[CHECKOUT_STEPS.length - 1]?.offsetWidth;

    if (firstStepWidth !== undefined && lastStepWidth !== undefined) {
      setMargins({
        marginLeft: firstStepWidth / 2,
        marginRight: lastStepWidth / 2,
      });
    }
  }, [CHECKOUT_STEPS.length]);

  if (!CHECKOUT_STEPS.length) {
    return null;
  }

  const handleNext = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === CHECKOUT_STEPS.length) {
        setIsComplete(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  };

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (CHECKOUT_STEPS.length - 1)) * 100;
  };

  const ActiveComponent =
    CHECKOUT_STEPS[currentStep - 1]?.Component ?? DefaultComponent;
  return (
    <>
      <div className="mx-auto p-6">
        <div className="stepper mb-20 flex items-center justify-between">
          {CHECKOUT_STEPS.map((step, index) => (
            <div
              key={step.name}
              //   ref={(el) => (stepRef.current[index] = el as HTMLDivElement)}
              ref={(el) => (stepRef.current[index] = el!)}
              className={`step ${
                currentStep > index + 1 || isComplete ? "complete" : ""
              } ${currentStep === index + 1 ? "active" : ""}`}
            >
              <div className="step-number">
                {currentStep > index + 1 || isComplete ? (
                  <span>&#10003;</span>
                ) : (
                  index + 1
                )}
              </div>
              <div className="step-name">{step.name}</div>
            </div>
          ))}

          <div
            className="progress-bar absolute left-0 top-1/4 h-4 bg-gray-400"
            style={{
              width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
              marginLeft: margins.marginLeft,
              marginRight: margins.marginRight,
            }}
          >
            <div
              className="progress h-full bg-green-500"
              style={{ width: `${calculateProgressBarWidth()}%` }}
            ></div>
          </div>
        </div>

        <ActiveComponent />

        {/* {!isComplete && (
          <button className="btn" onClick={handleNext}>
            {currentStep === CHECKOUT_STEPS.length ? "Finish" : "Next"}
          </button>
        )} */}
      </div>
    </>
  );
};

export default CheckoutPage;
