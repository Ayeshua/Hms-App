export const isPasswordEqualConfirmPassword = ({
  control,
  value,
}: {
  control: any;
  value: string;
}) => {
  const {
    _formValues: { password },
  } = control;
  if (password != value) {
    return 'Password does not Match ';
  } else {
    return true;
  }
};
