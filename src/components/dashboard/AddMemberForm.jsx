import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';

export default function AddMemberForm({ existingNames = [], onSubmit, loading = false }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Member name is required';
    } else if (existingNames.some((n) => n.toLowerCase() === formData.name.trim().toLowerCase())) {
      newErrors.name = 'A member with this name already exists';
    }

    if (formData.phone && !/^[\d+\-\s]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
    });

    setFormData({ name: '', phone: '' });
    setErrors({});
  };

  return (
    <Card title="Add Member" subtitle="Register a new member">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter member's full name"
          error={errors.name}
          required
        />

        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="e.g. +254 712 345 678"
          error={errors.phone}
        />

        <div className="pt-2">
          <Button type="submit" loading={loading} className="w-full">
            Add Member
          </Button>
        </div>
      </form>
    </Card>
  );
}