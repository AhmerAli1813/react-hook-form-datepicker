# React Hook Form Custom Date Picker

A beautiful, production-ready Date Picker component for React, built with [React Hook Form](https://react-hook-form.com/), [Tailwind CSS](https://tailwindcss.com/), and [Lucide React](https://lucide.dev/icons/). This component supports year/month dropdowns, calendar selection, form validation, error handling, and seamless integration with React Hook Form.

## Features

- **Form Validation**: Automatic validation with error display.
- **Controller Integration**: Seamless integration with React Hook Form's Controller.
- **Error Handling**: Automatic error display with styling.
- **Required Field Support**: Visual indicators for required fields.
- **Clearable Dates**: Optional clear functionality.
- **Date Range Validation**: Min/max date constraints.
- **Beautiful UI**: Modern, accessible, and responsive design.

## Demo

![Date Picker Demo](demo-screenshot.png)

## Getting Started

### Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/ahmerali1813/react-hook-form-datepicker.git
cd react-hook-form-datepicker
npm install
```

### Usage

Import and use the `DatePicker` component in your form:

```tsx
import { useForm } from 'react-hook-form';
import DatePicker from './components/DatePicker';

function MyForm() {
  const { control, handleSubmit } = useForm();

  return (
    <form>
      <DatePicker
        control={control}
        inputName="myDate"
        label="Select Date"
        required={true}
        isClearable={true}
        minDate={new Date()}
        maxDate={new Date(2030, 11, 31)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Props

See [`DatePickerProps`](src/types/datepicker.types.ts) for all available props.

## Customization

- **Date Format**: Supports `dd/mm/yyyy`, `mm/dd/yyyy`, and `yyyy-mm-dd`.
- **Styling**: Easily customizable via Tailwind CSS classes.
- **Icons**: Uses Lucide React for icons.

## License

MIT

---

> Built with ❤️ using React, Tailwind CSS, and React Hook Form.
