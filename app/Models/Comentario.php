<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comentario extends Model
{
    protected $table      = 'comentario';
    protected $primaryKey = 'id_comentario';
    public $timestamps    = false;

    protected $fillable = [
        'id_video',
        'id_user',
        'contenido',
        'fecha',
    ];

    protected function casts(): array
    {
        return [
            'fecha' => 'datetime',
        ];
    }
}