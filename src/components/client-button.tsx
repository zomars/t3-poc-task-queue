"use client";
import { Button } from "~/components/ui/button";

export const ClientButton = ({
  action,
  children,
}: {
  action: () => Promise<void>;
  children: React.ReactNode;
}) => {
  return (
    <Button
      onClick={async () => {
        await action();
      }}
    >
      {children}
    </Button>
  );
};
