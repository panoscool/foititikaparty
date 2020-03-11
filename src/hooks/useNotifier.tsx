import { VariantType, useSnackbar } from 'notistack';

function useNotifier() {
  const { enqueueSnackbar } = useSnackbar();

  const handleNotifier = (message: string, variant: VariantType) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant });
  };

  return { handleNotifier }
}

export default useNotifier;
