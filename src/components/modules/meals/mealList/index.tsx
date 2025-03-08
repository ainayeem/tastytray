"use client";

import { Button } from "@/components/ui/button";
import { CustomTable } from "@/components/ui/core/customTable/CustomTable";
import { IMeal } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MealList = ({ meals, meta }: { meals: IMeal[]; meta: any }) => {
  const router = useRouter();

  console.log("🚀 ~ MealList ~ meals:", meals);
  console.log("🚀 ~ MealList ~ meta:", meta);

  const columns: ColumnDef<IMeal>[] = [
    // select
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => {
    //         if (value) {
    //           setSelectedIds((prev) => [...prev, row.original._id]);
    //         } else {
    //           setSelectedIds(selectedIds.filter((id) => id !== row.original._id));
    //         }
    //         row.toggleSelected(!!value);
    //       }}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },

    {
      accessorKey: "name",
      header: "Meal Name",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image src={row.original.imgUrl} alt={row.original.name} width={40} height={40} className="w-8 h-8 rounded-full" />
          <span className="truncate">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <span>{row.original.category}</span>,
    },
    {
      accessorKey: "portionSize",
      header: "Portion Size",
      cell: ({ row }) => <span>{row.original.portionSize}</span>,
    },
    {
      accessorKey: "availability",
      header: "Availability",
      cell: ({ row }) => <span>{row.original.availability ? "Available" : "Not Available"}</span>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <span>BDT {row.original.price.toFixed(2)}</span>,
    },

    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          {/* <button className="text-gray-500 hover:text-blue-500" title="View" onClick={() => handleView(row.original)}>
            <Eye className="w-5 h-5" />
          </button> */}

          <button
            className="text-gray-500 hover:text-green-500"
            title="Edit"
            onClick={() => router.push(`/user/shop/products/update-product/${row.original._id}`)}
          >
            <Edit className="w-5 h-5" />
          </button>

          {/* <button className="text-gray-500 hover:text-red-500" title="Delete" onClick={() => handleDelete(row.original)}>
            <Trash className="w-5 h-5" />
          </button> */}
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="flex items-center justify-between my-3">
        <h1 className="text-xl font-bold">Manage Meals</h1>
        <div className="flex items-center gap-2">
          <Button onClick={() => router.push("/dashboard/mealProvider/add-meal")} size="sm">
            Add Meal <Plus />
          </Button>
        </div>
      </div>
      <CustomTable columns={columns} data={meals || []} />
      {/* <TablePagination totalPage={meta?.totalPage} /> */}

      {/* <DeleteConfirmationModal name={selectedItem} isOpen={isModalOpen} onOpenChange={setModalOpen} onConfirm={handleDeleteConfirm} /> */}
    </div>
  );
};

export default MealList;
