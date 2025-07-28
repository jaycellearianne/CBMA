"use client";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface Fee {
  id: number;
  feeTitle: string;
  amount: string;
  year: string;
  status: string;
}

interface FeesDataProps {
  fees: Fee[];
  onAddFeeAction: () => void;
  onEditFeeAction: (fee: Fee) => void;
  onDeleteFeeAction: (fee: Fee) => void;
}

export default function FeesData({
  fees,
  onAddFeeAction,
  onEditFeeAction,
  onDeleteFeeAction,
}: FeesDataProps) {
  const feesByYear = fees.reduce((acc, fee) => {
    if (!acc[fee.year]) acc[fee.year] = [];
    acc[fee.year].push(fee);
    return acc;
  }, {} as Record<string, Fee[]>);

  const sortedYears = Object.keys(feesByYear).sort(
    (a, b) => Number(b) - Number(a)
  );

  const calculateYearTotal = (yearFees: Fee[]) =>
    yearFees.reduce((total, fee) => {
      const amount = parseFloat(fee.amount.replace(/[₱,]/g, ""));
      return total + amount;
    }, 0);

  const formatCurrency = (amount: number) =>
    `₱${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const getStatusBadgeColor = (status: string) =>
    status === "Paid"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-black">Service Fees</h3>
        <Button
          size="sm"
          onClick={onAddFeeAction}
          className="bg-[#6F4E37] hover:bg-[#5D3E2A] text-white text-xs px-3 py-2 h-8 rounded-md"
        >
          <Plus className="w-3 h-3 mr-1" />
          Add a fee
        </Button>
      </div>

      {fees.length > 0 ? (
        <Accordion type="multiple" className="space-y-4">
          {sortedYears.map((year) => {
            const yearFees = feesByYear[year];
            const totalAmount = calculateYearTotal(yearFees);
            const paidCount = yearFees.filter(
              (f) => f.status === "Paid"
            ).length;

            return (
              <AccordionItem
                key={year}
                value={year}
                className="border border-gray-200 rounded-lg bg-white"
              >
                <AccordionTrigger className="px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                    <h4 className="font-bold text-lg text-black">
                      {year}
                    </h4>
                    <p className="text-sm text-gray-500">
                      ({paidCount}/{yearFees.length} paid)
                    </p>
                    </div>
                  <div className="text-right text-[#6F4E37] font-semibold text-sm">
                    {formatCurrency(totalAmount)}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 space-y-3">
                  {yearFees.map((fee) => (
                    <div
                      key={fee.id}
                      className="bg-gray-50 border border-gray-100 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 font-bold text-[#6F4E37]">
                            {fee.feeTitle}
                          </div>
                          <span className="font-semibold text-black text-sm">
                            {fee.amount}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge
                            className={`${getStatusBadgeColor(
                              fee.status
                            )} text-xs font-medium px-2 py-0.5`}
                          >
                            {fee.status}
                          </Badge>

                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onEditFeeAction(fee)}
                            className="h-8 w-8 p-0 hover:bg-gray-200"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>

                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onDeleteFeeAction(fee)}
                            className="h-8 w-8 p-0 text-destructive hover:bg-red-100 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No fees recorded yet.</p>
        </div>
      )}
    </div>
  );
}
