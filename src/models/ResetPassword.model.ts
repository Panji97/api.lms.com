import {
  Model,
  Table,
  Column,
  AllowNull,
  AutoIncrement,
  Unique,
  Default,
  PrimaryKey,
  Comment,
  DataType
} from 'sequelize-typescript'

@Table({ tableName: 'resetPassword', paranoid: true })
export class ResetPassword extends Model<ResetPassword> {
  @Comment('')
  @AllowNull(false)
  @PrimaryKey
  @Column
  tokenResetPassword: string

  @Comment('')
  @AllowNull(true)
  @Column
  email?: string

  @Comment('')
  @AllowNull(true)
  @Column
  tokenExpiryTime?: Date

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
}
