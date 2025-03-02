const Comment = require('../models/Comment');

// Добавляем комментарий
const addComment = async (req, res) => {
    try {
        const { postId, comment } = req.body;

        if (!postId || !comment) {
            return res.status(400).json({ message: 'PostId and comment are required' });
        }

        const newComment = await new Comment({
            post: postId,
            owner: req.userId,
            comment
        });

        await newComment.save();
        return res.status(201).json(newComment);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

// Получение комментариев определенного поста
const getCommentByPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.find({ post: postId }).populate('owner', 'username email');
        return res.status(200).json(comments);
        
    } catch (error) {
        console.log(error)
        return res.status(404).json({ message: "Comment was not found" });
    }
}

// Редактирование комментария(только владелец)
const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { comment } = req.body;
        const commentaryBlock = await Comment.findById(commentId);

        if(!commentaryBlock) {
            return res.status(404).json({ message: 'Comment was not founded' });
        }

        if (commentaryBlock.owner.toString() !== req.userId) {
            return res.status(403).json({ message: 'You do not have permission to edit this comment' });
        }

        commentaryBlock.comment = comment || commentaryBlock.comment;
        await commentaryBlock.save();

        return res.status(200).json(commentaryBlock);

    } catch (error) {
        return res.status(404).json({ message: 'Server error' })
    }
}

// Удаляем комментарий(только владелец)
const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findByIdAndDelete(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment was not found' })
        }

        // Проверяем является ли текущий пользователь владельцем
        if (comment.owner.toString() !== req.userId) {
            return res.status(403).json({ message: 'You do not have permission to edit this comment' });
        }
        return res.status(200).json({ message: 'Comment was deleted successfully' })
    } catch (error) {
        return res.status(500).json({ message: 'Server error' })
    }
}

module.exports = { addComment, getCommentByPost, updateComment, deleteComment }