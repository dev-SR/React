# React Hook Form

## Resources

- [https://www.austinshelby.com/blog/build-a-react-form-with-react-hook-form-and-zod](https://www.austinshelby.com/blog/build-a-react-form-with-react-hook-form-and-zod)

## Introduction

```tsx
import { TextInput, Checkbox, Button, Group, Box, Flex } from '@mantine/core';
import { useForm } from 'react-hook-form';
type Inputs = {
 name: string;
 email: string;
 password: string;
 termsOfService: boolean;
};
function Demo() {
 const {
  register,
  handleSubmit,
  watch,
  formState: { errors }
 } = useForm<Inputs>();
 const onSubmit = (data: Inputs) => window.alert(JSON.stringify(data, null, 4));

 return (
  <div className='flex items-center min-h-screen '>
   <form onSubmit={handleSubmit(onSubmit)} className='mx-auto w-full px-4 md:w-1/3'>
    <Flex direction={'column'} gap='sm'>
     <TextInput label='Name' placeholder='Name' {...register('name')} />
     <TextInput label='Email' placeholder='Email' {...register('email')} />
     <TextInput label='Password' placeholder='Password' {...register('password')} />

     <Checkbox label='I agree to sell my privacy' {...register('termsOfService')} />
     <Group position='right'>
      <Button
       type='submit'
       style={{
        fontWeight: 400
       }}>
       Submit
      </Button>
     </Group>
    </Flex>
   </form>
  </div>
 );
}

export default Demo;
```

## Validate React Forms With React Hook Form

### with native HTML5 validation

To apply validations to a field, you can pass validation parameters to the register method. Validation parameters are similar to the existing HTML form validation standard.

These validation parameters include the following properties:

- `required` indicates if the field is required or not. If this property is set to true, then the field cannot be empty
- `minlength` and maxlength set the minimum and maximum length for a string input value
- `min` and max set the minimum and maximum values for a numerical value
- `pattern` defines a pattern for the input value using a regular expression.

```tsx
import { TextInput, Checkbox, Button, Group, Box, Flex, Radio } from '@mantine/core';
import { useForm } from 'react-hook-form';
type Inputs = {
 name: string;
 email: string;
 password: string;
 termsOfService: boolean;
 radio_option: string;
};
const registerOptions = {
 name: {
  required: 'Name is required',
  minLength: {
   value: 4,
   message: 'Name must be at least 4 characters'
  }
 },
 email: {
  required: 'Email is required',
  pattern: {
   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
   message: 'Invalid email address'
  }
 },
 password: {
  required: 'Password is required',
  minLength: {
   value: 8,
   message: 'Password must have at least 8 characters'
  }
 },
 termsOfService: {
  required: 'You must accept terms of service'
 },
 radio_option: {
  required: 'You must select an Options'
 }
};
const options = ['react', 'vue', 'angular'];
function Demo() {
 const {
  register,
  handleSubmit,
  watch,
  formState: { errors }
 } = useForm<Inputs>();
 const onSubmit = (data: Inputs) => window.alert(JSON.stringify(data, null, 4));
 console.log(errors);
 console.log(watch('radio_option'));

 return (
  <div className='flex items-center min-h-screen '>
   <form onSubmit={handleSubmit(onSubmit)} className='mx-auto w-full px-4 md:w-1/3'>
    <Flex direction={'column'} gap='sm'>
     <TextInput
      withAsterisk
      label='Name'
      placeholder='Name'
      {...register('name', registerOptions.name)}
      error={errors.name && errors.name.message}
     />
     <TextInput
      withAsterisk
      label='Email'
      placeholder='Email'
      {...register('email', registerOptions.email)}
      error={errors.email && errors.email.message}
     />
     <TextInput
      withAsterisk
      label='Password'
      placeholder='Password'
      {...register('password', registerOptions.password)}
      error={errors.password && errors.password.message}
     />
     <Radio.Group
      label='Select your favorite framework/library'
      description='This is anonymous'
      withAsterisk
      spacing='xs'
      name='radio_option'
      error={errors.radio_option && errors.radio_option.message}>
      <Radio
       value='react'
       label='React'
       {...register('radio_option', registerOptions.radio_option)}
      />
      <Radio
       value='svelte'
       label='Svelte'
       {...register('radio_option', registerOptions.radio_option)}
      />
      <Radio
       value='ng'
       label='Angular'
       {...register('radio_option', registerOptions.radio_option)}
      />
      <Radio
       value='vue'
       label='Vue'
       {...register('radio_option', registerOptions.radio_option)}
      />
     </Radio.Group>
     <Checkbox
      label='I agree to sell my privacy'
      {...register('termsOfService', registerOptions.termsOfService)}
      error={errors.termsOfService && errors.termsOfService.message}
     />
     <Group position='right'>
      <Button
       type='submit'
       style={{
        fontWeight: 400
       }}>
       Submit
      </Button>
     </Group>
    </Flex>
   </form>
  </div>
 );
}

export default Demo;
```

### with resolver: `yup`, `zod`,  etc

Validating with `zod`

```sh
yarn add zod @hookform/resolvers
```

```tsx
import { TextInput, Checkbox, Button, Group, Box, Flex, Radio } from '@mantine/core';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const FormSchema = z.object({
 name: z.string().min(4, 'Name must be at least 4 characters'),
 email: z.string().email('Invalid email address'),
 password: z.string().min(8, 'Password must have at least 8 characters'),
 termsOfService: z.literal(true, {
  invalid_type_error: 'You must accept Terms and Conditions.'
 }),
 radio_option: z
  .string({ invalid_type_error: 'Please select option.' })
  .refine((val) => options.map((option) => option.id).includes(val))
});
type FormSchemaType = z.infer<typeof FormSchema>; // Inferred Type

const options = [
 {
  id: 'react',
  label: 'React'
 },
 {
  id: 'vue',
  label: 'Vue'
 },
 {
  id: 'angular',
  label: 'Angular'
 }
];
function Demo() {
 const {
  register,
  handleSubmit,
  watch,
  formState: { errors }
 } = useForm<FormSchemaType>({
  resolver: zodResolver(FormSchema)
 });

 const onSubmit: SubmitHandler<FormSchemaType> = (data) =>
  window.alert(JSON.stringify(data, null, 4));

 return (
  <div className='flex items-center min-h-screen '>
   <form onSubmit={handleSubmit(onSubmit)} className='mx-auto w-full px-4 md:w-1/3'>
    <Flex direction={'column'} gap='sm'>
     <TextInput
      withAsterisk
      label='Name'
      placeholder='Name'
      {...register('name')}
      error={errors.name && errors.name.message}
     />
     <TextInput
      withAsterisk
      label='Email'
      placeholder='Email'
      {...register('email')}
      error={errors.email && errors.email.message}
     />
     <TextInput
      withAsterisk
      label='Password'
      placeholder='Password'
      {...register('password')}
      error={errors.password && errors.password.message}
     />
     <Radio.Group
      label='Select your favorite framework/library'
      description='This is anonymous'
      withAsterisk
      spacing='xs'
      name='radio_option'
      error={errors.radio_option && errors.radio_option.message}>
      {options.map((option) => (
       <Radio
        key={option.id}
        value={option.id}
        {...register('radio_option')}
        label={option.label}
       />
      ))}
     </Radio.Group>
     <Checkbox
      label='I agree to sell my privacy'
      {...register('termsOfService')}
      error={errors.termsOfService && errors.termsOfService.message}
     />
     <Group position='right'>
      <Button
       type='submit'
       style={{
        fontWeight: 400
       }}>
       Submit
      </Button>
     </Group>
    </Flex>
   </form>
  </div>
 );
}

export default Demo;
```
