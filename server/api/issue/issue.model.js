import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const IssueSchema = new Schema({
  user:           { type: Schema.Types.ObjectId, ref: 'User' },
  title:          String,
  message:        String,
  section:        String,
  parentId:       String,
  questionId:     String,
  createdAt:      Date,
  updatedAt:      Date,
  closed:         Boolean
});

IssueSchema.pre('save', function(next) {
  const now = Date.now();

  if (this.isNew) {
    this.createdAt = now;
  }

  this.updatedAt = now;

  next();
});

try {
  mongoose.model('Issue', IssueSchema);
} catch (_) {
  // Used only for mocha in watch mode
}

export default mongoose.model('Issue', IssueSchema);
