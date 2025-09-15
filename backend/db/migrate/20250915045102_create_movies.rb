class CreateMovies < ActiveRecord::Migration[8.0]
  def change
    create_table :movies do |t|
      t.string :name
      t.float :price
      t.date :release_date

      t.timestamps
    end
  end
end
