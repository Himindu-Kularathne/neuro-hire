/*
Copyright (c) 2025 Neuro Hire

Licensed under the MIT License.
See LICENSE file in the project root for full license information.
*/

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: `Something went wrong! : ${err}` });
};

module.exports = errorHandler;
