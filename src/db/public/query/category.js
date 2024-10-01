import { desc, eq } from 'drizzle-orm';
import {
	handleError,
	handleResponse,
	validateRequest,
} from '../../../util/index.js';
import * as hrSchema from '../../hr/schema.js';
import db from '../../index.js';

import { category } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const categoryPromise = db
		.insert(category)
		.values(req.body)
		.returning({ insertedName: buyer.name });

	try {
		const data = await categoryPromise;
		const toast = {
			status: 201,
			type: 'insert',
			message: `${data[0].insertedName} inserted`,
		};
		return await res.status(201).json({ toast, data });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}

export async function update(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const categoryPromise = db
		.update(category)
		.set(req.body)
		.where(eq(category.uuid, req.body.uuid))
		.returning({ updatedName: category.name });

	try {
		const data = await categoryPromise;
		const toast = {
			status: 200,
			type: 'update',
			message: `${data[0].updatedName} updated`,
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}

export async function remove(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const categoryPromise = db
		.delete(category)
		.where(eq(category.uuid, req.body.uuid))
		.returning({ deletedName: category.name });

	try {
		const data = await categoryPromise;
		const toast = {
			status: 200,
			type: 'delete',
			message: `${data[0].deletedName} deleted`,
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}

export async function selectAll(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const categoryPromise = db
		.select({
			uuid: category.uuid,
			name: category.name,
			created_by: category.created_by,
			created_by_name: hrSchema.users.name,
			created_at: category.created_at,
			updated_at: category.updated_at,
			remarks: category.remarks,
		})
		.from(category)
		.leftJoin(hrSchema.users, eq(category.created_by, hrSchema.users.uuid))
		.orderBy(desc(category.created_at));

	const toast = {
		status: 200,
		type: 'select all',
		message: 'categories list',
	};

	handleResponse({ promise: categoryPromise, res, next, ...toast });
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const categoryPromise = db
		.select({
			uuid: category.uuid,
			name: category.name,
			created_by: category.created_by,
			created_by_name: hrSchema.users.name,
			created_at: category.created_at,
			updated_at: category.updated_at,
			remarks: category.remarks,
		})
		.from(category)
		.leftJoin(hrSchema.users, eq(category.created_by, hrSchema.users.uuid))
		.where(eq(category.uuid, req.body.uuid))
		.orderBy(desc(category.created_at));

	try {
		const data = await categoryPromise;
		const toast = {
			status: 200,
			type: 'select one',
			message: 'category details',
		};
		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		await handleError({
			error,
			res,
		});
	}
}
