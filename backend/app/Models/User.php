<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

   
    public function adoptions()
    {
        return $this->hasMany(Adoption::class);
    }

    
public function events()
{
    return $this->belongsToMany(Event::class);
}


public function profile()
{
    return $this->hasOne(Profile::class);
}


}
