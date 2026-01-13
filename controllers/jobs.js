const User = require('../models/User');
const Job = require('../models/Job');
const {StatusCodes} = require('http-status-codes');
const BadRequestError = require('../errors/bad-request');
const NotFoundError = require('../errors/not-found');

const getAllJobs = async (req, res) => {
    const job = await Job.find({ createdBy: req.user._id }).sort('createdAt');
    res.status(StatusCodes.OK).json({ job, count: job.length });
};

const getJob = async (req, res) => {
    const jobId = req.params.id;
    const job = await Job.findOne({ _id: jobId, createdBy: req.user._id });
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`);
    }
    res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
    const job = await Job.create({ ...req.body, createdBy: req.user._id });
    res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
    const { 
        body: { company, position },
        user: { _id: userId },
        params: { id: jobId }
    } = req;

    if (company === '' || position === '') {
        throw new BadRequestError('Company or Position fields cannot be empty');
    }

    const job = await Job.findByIdAndUpdate(
        { _id: jobId, createdBy: userId },
        req.body,
        { new: true, runValidators: true }
    );

    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`);
    }
    res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
    const {
        user: { _id: userId },
        params: { id: jobId }
    } = req;

    const job = await Job.findByIdAndRemove({ _id: jobId, createdBy: userId });

    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`);
    }
    res.status(StatusCodes.OK).json({ msg: 'Job removed successfully' });
};

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
};