"use client";
import { api } from "@/trpc/react";
import { useState } from "react";
import { CollectionType } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const ProductList = () => {
  const [productType, setProductType] = useState<CollectionType>("MEN");
  const { data: products, isError } = api.product.list.useQuery({
    take: 10,
    types: productType,
  });

  return (
    <>
      <h1 className="text-center text-xl font-semibold md:text-2xl">Products</h1>
      <div className="ml-auto flex items-center gap-2">
        <Select
          value={productType}
          onValueChange={(value) => setProductType(value as CollectionType)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a product type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Types</SelectLabel>
              <SelectItem value="MEN">MEN</SelectItem>
              <SelectItem value="WOMEN">WOMEN</SelectItem>
              <SelectItem value="KIDS">KIDS</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Link href="/admin/products/new">
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Product
            </span>
          </Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {/* <TableHead className="hidden w-[100px] sm:table-cell">
              <span className="sr-only">Image</span>
            </TableHead> */}
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Price</TableHead>
            <TableHead className="hidden md:table-cell">Collection</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.products.map((product, index) => (
            <TableRow key={index}>
              {/* <TableCell className="hidden sm:table-cell">
                {product?.images && product?.images?.length > 0 && (
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height={64}
                    src={product?.images[0]?.imageURL!}
                    width={64}
                  />
                )}
              </TableCell> */}
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell className="hidden md:table-cell">
                ₹{product.price}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {product.collection.name}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ProductList;
