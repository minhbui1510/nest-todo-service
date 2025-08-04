export const prismaErrorMap: Record<
  string,
  { message: string; code: string }
> = {
  // Connection & engine errors (P1000 - P1012)
  P1000: {
    code: 'ERR_DB_AUTH_FAILED',
    message: 'Authentication failed against the database server.',
  },
  P1001: {
    code: 'ERR_DB_NOT_REACHABLE',
    message: 'Cannot reach the database server.',
  },
  P1002: {
    code: 'ERR_DB_TIMEOUT',
    message: 'Database connection timed out.',
  },
  P1003: {
    code: 'ERR_INVALID_DATABASE_STRING',
    message: 'Database string is malformed.',
  },
  P1008: {
    code: 'ERR_DB_OPERATION_TIMEOUT',
    message: 'Database operation timed out.',
  },
  P1009: {
    code: 'ERR_DB_ALREADY_EXISTS',
    message: 'Database already exists.',
  },
  P1010: {
    code: 'ERR_PERMISSION_DENIED',
    message: 'User does not have permission to perform the action.',
  },
  P1011: {
    code: 'ERR_DATABASE_CRASHED',
    message: 'Database crashed or became unresponsive.',
  },
  P1012: {
    code: 'ERR_UNKNOWN_QUERY_ENGINE',
    message: 'Unknown query engine error.',
  },

  // Query engine & constraint errors (P2000 - P2029)
  P2000: {
    code: 'ERR_VALUE_TOO_LONG',
    message: 'Input value is too long for the column.',
  },
  P2001: {
    code: 'ERR_RECORD_NOT_FOUND',
    message: 'Record not found.',
  },
  P2002: {
    code: 'ERR_UNIQUE_CONSTRAINT_FAILED',
    message: 'Unique constraint failed on the field.',
  },
  P2003: {
    code: 'ERR_FOREIGN_KEY_CONSTRAINT',
    message: 'Foreign key constraint failed.',
  },
  P2004: {
    code: 'ERR_CONSTRAINT_FAILED',
    message: 'Constraint failed on the database.',
  },
  P2005: {
    code: 'ERR_INVALID_VALUE',
    message: 'Invalid value for the field.',
  },
  P2006: {
    code: 'ERR_MISSING_REQUIRED_VALUE',
    message: 'Missing required value.',
  },
  P2007: {
    code: 'ERR_DATA_VALIDATION',
    message: 'Data validation error.',
  },
  P2008: {
    code: 'ERR_QUERY_PARSE_FAILED',
    message: 'Failed to parse query.',
  },
  P2009: {
    code: 'ERR_QUERY_EXECUTION_FAILED',
    message: 'Query execution error.',
  },
  P2010: {
    code: 'ERR_RAW_QUERY_FAILED',
    message: 'Raw query failed.',
  },
  P2011: {
    code: 'ERR_NULL_CONSTRAINT',
    message: 'Null constraint violation.',
  },
  P2012: {
    code: 'ERR_MISSING_REQUIRED_ARGUMENT',
    message: 'Missing required argument.',
  },
  P2013: {
    code: 'ERR_MISSING_RELATION',
    message: 'Missing required relation field.',
  },
  P2014: {
    code: 'ERR_CYCLIC_RELATIONSHIP',
    message: 'Detected a cycle in a relation.',
  },
  P2015: {
    code: 'ERR_RELATION_NOT_FOUND',
    message: 'Relation record not found.',
  },
  P2016: {
    code: 'ERR_INVALID_RESULT',
    message: 'Invalid result from query.',
  },
  P2017: {
    code: 'ERR_ALREADY_CONNECTED',
    message: 'Record already connected.',
  },
  P2018: {
    code: 'ERR_RELATED_RECORD_NOT_FOUND',
    message: 'Related record not found.',
  },
  P2025: {
    code: 'ERR_RECORD_TO_MODIFY_NOT_FOUND',
    message: 'Record to update or delete does not exist.',
  },
  P2026: {
    code: 'ERR_MISSING_TX_ISOLATION_LEVEL',
    message: 'Missing transaction isolation level.',
  },
  P2027: {
    code: 'ERR_INTROSPECTION_FAILED',
    message: 'Introspection failed.',
  },
  P2028: {
    code: 'ERR_ENV_VALIDATION',
    message: 'Environment variable validation error.',
  },
  P2033: {
    code: 'ERR_JSON_PARSE',
    message: 'JSON parsing error.',
  },
};
