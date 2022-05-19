import joi, { ValidationError } from 'joi';
import joiDate from '@joi/date';
joi.extend(joiDate);

export { joi }