import { Customer } from "@prisma/client";

export default function userViewer(customer: Customer) {
  const customerView = {
      id: customer.id,
      name: customer.name,
      address: customer.address,
      phoneNumber: customer.phoneNumber,
  };
  return customerView;
}
