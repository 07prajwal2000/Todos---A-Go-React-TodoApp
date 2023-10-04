import toast, { Toast as ToastType } from "react-hot-toast";

export default {
	Default: Toast,
	Success,
  Error,
  Promise
};

const config: Partial<ToastType> = {
	duration: 2100,
	position: "top-right",
};

function Toast(msg: string) {
	toast(msg, config);
}

function Success(msg: string) {
	toast.success(msg, config);
}

function Error(msg: string) {
	toast.error(msg, config);
}

function Promise(
	loading: string,
	success: string,
	error: string,
	promise: Promise<unknown>
) {
	toast.promise(promise, {
		error,
		loading,
		success,
	}, config);
}
