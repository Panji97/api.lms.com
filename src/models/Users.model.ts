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

@Table({ tableName: 'users' })
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
}
