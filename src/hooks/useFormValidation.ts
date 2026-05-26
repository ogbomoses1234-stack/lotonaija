import { useState, useCallback } from 'react';

type ValidationErrors<T> = Partial<Record<keyof T, string>>;
type ValidationRule<T> = (value: T[keyof T], values: T) => string | Promise<string> | null;

interface UseFormValidationProps<T extends Record<string, unknown>> {
  initialValues: T;
  validationRules?: Partial<Record<keyof T, ValidationRule<T>>>;
  onSubmit: (values: T) => Promise<void> | void;
}

/**
 * Lightweight, type-safe form validation hook
 * Supports sync/async validators, touched states, and debounced error clearing
 */
export const useFormValidation = <T extends Record<string, unknown>>({
  initialValues,
  validationRules = {},
  onSubmit,
}: UseFormValidationProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors<T>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setFieldValue = useCallback((name: keyof T, value: unknown) => {
    setValues(prev => ({ ...prev, [name]: value }));
    // Clear error on change for better UX
    if (errors[name]) {
      setErrors(prev => { const next = { ...prev }; delete next[name]; return next; });
    }
  }, [errors]);

  const setFieldTouched = useCallback((name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const validateField = useCallback(async (name: keyof T): Promise<string | null> => {
    const rule = validationRules[name];
    if (!rule) return null;
    try {
      return (await rule(values[name], values)) || null;
    } catch {
      return 'Validation failed';
    }
  }, [validationRules, values]);

  const validateAll = useCallback(async (): Promise<boolean> => {
    const newErrors: ValidationErrors<T> = {};
    let hasErrors = false;

    for (const key in validationRules) {
      const fieldName = key as keyof T;
      if (validationRules[fieldName]) {
        const err = await validateField(fieldName);
        if (err) { newErrors[fieldName] = err; hasErrors = true; }
      }
    }
    setErrors(newErrors);
    return !hasErrors;
  }, [validateField, validationRules]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await validateAll();
    
    // Mark all fields as touched to surface validation errors
    const allTouched: typeof touched = {};
    for (const key in values) allTouched[key as keyof T] = true;
    setTouched(allTouched);

    if (!isValid) return;

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } catch (err) {
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  }, [validateAll, onSubmit, values]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    validateField,
    reset: () => {
      setValues(initialValues);
      setErrors({});
      setTouched({});
    },
  };
};