import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Collections } from "@/types";
import React from "react";

interface CollectionDropdownProps {
  collections: Collections | undefined;
  selectedCollectionId: number | undefined;
  onSelect: (collectionId: number) => void;
}

const CollectionDropdown: React.FC<CollectionDropdownProps> = ({
  collections,
  selectedCollectionId,
  onSelect,
}) => {
  const selectedCollectionName = collections
    ?.flatMap((collec) => collec.children)
    .find((child) => child.id === selectedCollectionId)?.name;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full text-left">
          {selectedCollectionName ?? "Select collection"}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 border shadow-lg">
        <DropdownMenuGroup>
          {collections?.map((collec) => (
            <DropdownMenuSub key={collec.id}>
              <DropdownMenuSubTrigger className="py-2 hover:bg-gray-100">
                {collec.name}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="border">
                  {collec.children.map((child) => (
                    <DropdownMenuItem
                      key={child.id}
                      onClick={() => onSelect(child.id)}
                      className="py-2 hover:bg-gray-100"
                    >
                      {child.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CollectionDropdown;
