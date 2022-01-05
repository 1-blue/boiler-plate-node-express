const Post = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      _id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: "게시글의 아이디 ( 게시글을 식별할 값 )",
      },
      content: {
        type: DataTypes.STRING(200),
        alllowNull: true,
        comment: "게시글의 내용 ( 최대 200자, , 특수문자 가능 )",
      },
    },
    {
      sequelize,
      timestamps: true,
      paranoid: false,
      underscored: false,
      modelName: "Post",
      tableName: "posts",
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    },
  );

  Post.associate = db => {
    // 유저와 게시글 ( 1 : N )
    db.Post.belongsTo(db.User, { foreignKey: "UserId", onDelete: "cascade" });
  };

  return Post;
};

module.exports = Post;
