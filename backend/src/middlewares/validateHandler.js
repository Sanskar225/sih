export const validate = (schema) => (req, res, next) => {
	const parsed = schema.safeParse(req.body);
	if (!parsed.success) {
		return res.status(400).json({ success: false, errors: parsed.error.errors });
	}
	req.validated = parsed.data;
	next();
};
