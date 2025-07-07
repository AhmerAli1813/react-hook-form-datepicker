import React from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from './components/DatePicker';
import { formatDate } from './utils/dateUtils';

interface FormData {
  birthDate: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  appointmentDate: Date | null;
}

function App() {
  const { control, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      birthDate: null,
      startDate: null,
      endDate: null,
      appointmentDate: new Date()
    }
  });

  const watchedValues = watch();

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    alert('Form submitted! Check console for data.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            React Hook Form Date Picker
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A production-ready date picker component integrated with React Hook Form, 
            featuring elegant dropdowns, form validation, and error handling.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Basic Date Picker */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">
                Basic Date Selection
              </h2>
              
              <DatePicker
                control={control}
                inputName="birthDate"
                label="Birth Date"
                placeholder="Select your birth date"
                required={true}
                isClearable={true}
                maxDate={new Date()}
              />

              <DatePicker
                control={control}
                inputName="appointmentDate"
                label="Appointment Date"
                placeholder="Select appointment date"
                required={false}
                isClearable={true}
                minDate={new Date()}
              />
            </div>

            {/* Date Range */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">
                Date Range Selection
              </h2>
              
              <DatePicker
                control={control}
                inputName="startDate"
                label="Start Date"
                placeholder="Select start date"
                required={true}
                isClearable={true}
                maxDate={watchedValues.endDate || undefined}
              />

              <DatePicker
                control={control}
                inputName="endDate"
                label="End Date"
                placeholder="Select end date"
                required={true}
                isClearable={true}
                minDate={watchedValues.startDate || undefined}
              />
            </div>
          </div>

          {/* Form Values Display */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">
              Current Form Values
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-600">Birth Date:</span>
                  <p className="text-slate-900 font-semibold">
                    {watchedValues.birthDate ? formatDate(watchedValues.birthDate) : 'Not selected'}
                  </p>
                </div>
                
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-600">Appointment Date:</span>
                  <p className="text-slate-900 font-semibold">
                    {watchedValues.appointmentDate ? formatDate(watchedValues.appointmentDate) : 'Not selected'}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-600">Start Date:</span>
                  <p className="text-slate-900 font-semibold">
                    {watchedValues.startDate ? formatDate(watchedValues.startDate) : 'Not selected'}
                  </p>
                </div>
                
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-600">End Date:</span>
                  <p className="text-slate-900 font-semibold">
                    {watchedValues.endDate ? formatDate(watchedValues.endDate) : 'Not selected'}
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-semibold 
                           rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 
                           focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                Submit Form
              </button>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">
              React Hook Form Integration Features
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Form Validation</h3>
                    <p className="text-sm text-slate-600">Automatic validation with error display</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Controller Integration</h3>
                    <p className="text-sm text-slate-600">Seamless react-hook-form Controller support</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Error Handling</h3>
                    <p className="text-sm text-slate-600">Automatic error display with styling</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Required Field Support</h3>
                    <p className="text-sm text-slate-600">Visual indicators for required fields</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Clearable Dates</h3>
                    <p className="text-sm text-slate-600">Optional clear functionality</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Date Range Validation</h3>
                    <p className="text-sm text-slate-600">Min/max date constraints</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;