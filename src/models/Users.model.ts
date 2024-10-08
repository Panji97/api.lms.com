import {
  Model,
  Table,
  Column,
  AllowNull,
  PrimaryKey,
  Comment
} from 'sequelize-typescript'

@Table({ tableName: 'users', paranoid: true })
export class Users extends Model<Users> {
  @Comment('')
  @AllowNull(false)
  @PrimaryKey
  @Column
  email: string

  @Comment('')
  @AllowNull(false)
  @Column
  password: string

  @Comment('')
  @AllowNull(true)
  @Column
  createdAt?: Date

  @Comment('')
  @AllowNull(true)
  @Column
  updatedAt?: Date

  @Comment('')
  @AllowNull(true)
  @Column
  deletedAt?: Date

  @Comment('')
  @AllowNull(true)
  @Column
  token?: string

  @Comment('')
  @AllowNull(true)
  @Column
  rememberme?: boolean
}
