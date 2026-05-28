import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';

export default function RecordPaymentForm({ members, onSubmit, loading = false }) {
  const [formData, setFormData] = useState({
    memberId: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    note: '',
  });
  const [errors, setErrors] = useState({});

  const selectedMember = members.find((m) => m.id === Number(formData.memberId));

  const memberOptions = members.map((m) => ({
    value: m.id,
    label: `${m.name} — TSH ${m.remaining?.toLocaleString()} remaining`,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.memberId) {
      newErrors.memberId = 'Please select a member';
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (selectedMember && Number(formData.amount) > selectedMember.remaining) {
      newErrors.amount = `Amount exceeds remaining balance (TSH ${selectedMember.remaining?.toLocaleString()})`;
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      memberId: Number(formData.memberId),
      amount: Number(formData.amount),
      date: formData.date,
      note: formData.note,
    });

    setFormData({
      memberId: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      note: '',
    });
    setErrors({});
  };

  return (
    <Card title="Record Payment" subtitle="Add a new contribution">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          label="Member"
          name="memberId"
          value={formData.memberId}
          onChange={handleChange}
          options={memberOptions}
          placeholder="Select a member"
          error={errors.memberId}
          required
        />

        {selectedMember && (
          <div className="bg-blue-50 rounded-lg px-4 py-3 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-700">Total Paid:</span>
              <span className="font-semibold text-blue-800">TSH {selectedMember.totalPaid?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-blue-700">Remaining:</span>
              <span className="font-semibold text-blue-800">TSH {selectedMember.remaining?.toLocaleString()}</span>
            </div>
          </div>
        )}

        <Input
          label="Amount (TSH)"
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter amount"
          error={errors.amount}
          required
        />

        <Input
          label="Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          error={errors.date}
          required
        />

        <Input
          label="Note (optional)"
          name="note"
          value={formData.note}
          onChange={handleChange}
          placeholder="Payment description"
        />

        <div className="pt-2">
          <Button type="submit" loading={loading} className="w-full">
            Record Payment
          </Button>
        </div>
      </form>
    </Card>
  );
}