# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

# users テーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|varchar|null: false,unique:true,index,true|
|email|varchar|null: false|
|password|varchar|null: false|
|group_id|integer|null: false|

### Association
- has_many :groups,through:members
- has_many :members
- has_many :messages

## groups
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|varchar|null: false|

### Association
- has_many :members
- has_many :messages
- has_many :users,through:members

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|comment|varchar|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
