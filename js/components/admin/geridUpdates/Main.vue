<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="row">
                <div class="col-md-12">
                    <h3><span class="fa fa-check-square-o"></span> Atualizações GERID</h3>
                </div>
            </div>
        </div>
        <div class="panel-body">
            <div>
                <ul id="myTab" role="tablist" class="nav nav-tabs">
                    <li class="nav-item active">
                        <a id="list-tab" data-toggle="tab" href="#list" role="tab" aria-controls="list" aria-selected="false" aria-expanded="true" class="nav-link active">
                            <i aria-hidden="true" class="fa fa-list" style="color: rgb(27, 109, 133);"></i> Lista
                        </a>
                    </li>
                    <li v-if="usr.edicao" class="nav-item">
                        <a id="create-tab" data-toggle="tab" href="#create" role="tab" aria-controls="create" aria-selected="false" aria-expanded="true" class="nav-link">
                            <i aria-hidden="true" class="fa fa-save" style="color: rgb(27, 109, 133);"></i> Nova Atualização
                        </a>
                    </li>
                </ul>
                <div id="myTabContent" class="tab-content">
                    <div id="list" role="tabpanel" aria-labelledby="list-tab" class="tab-pane fade active in">
                        <div class="col-md-12">&nbsp;</div>
                        <div class="container">
                            <ul class="nav nav-pills">
                                <li class="active"><a data-toggle="pill" href="#ga">GA</a></li>
                                <li><a data-toggle="pill" href="#gc">GC</a></li>
                                <li><a data-toggle="pill" href="#ga-c">GA-C</a></li>
                                <li><a data-toggle="pill" href="#ga1-a">GA1-A</a></li>
                                <li><a data-toggle="pill" href="#-ga1-a">-GA1-A</a></li>
                                <li><a data-toggle="pill" href="#a1-a">A1-A</a></li>
                                <li><a data-toggle="pill" href="#gc-cc">GC-CC</a></li>
                                <li><a data-toggle="pill" href="#-gc-a">-GC-A</a></li>
                            </ul>
                            <div class="col-md-12">&nbsp;</div>
                            <div class="tab-content">
                                <div id="ga" class="tab-pane fade in active">
                                    <a href="#" class="btn btn-success" @click="executeUpdate(1)">Executar</a>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <table class="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th class="col-md-3">
                                                            <span>Nome da atualizacao</span>
                                                            <a href="#" @click="sort($event, 'name', 'asc')"><span><i class="glyphicon glyphicon-arrow-up" aria-hidden="true"></i></span></a>
                                                            <a href="#" @click="sort($event, 'name', 'desc')"><span><i class="glyphicon glyphicon-arrow-down" aria-hidden="true"></i></span></a>
                                                        </th>
                                                        <th>Tipo</th>
                                                        <th></th>
                                                        <th>JURIRBH</th>
                                                        <th>JURIRVT</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                <tr v-if="gerid_update.type_id == 1" v-for="(gerid_update, index) in list">
                                                    <td>{{gerid_update.name}}</td>
                                                    <td>{{gerid_update.group_code}}</td>
                                                    <td><a :href="edit_route.replace('--ID--', gerid_update.id)" class="btn btn-primary"><i class="fa fa-th-list" aria-hidden="true"></i> Detalhes</a></td>
                                                    <td>
                                                        <span v-if = "new Date(reference_datetime).getTime() > new Date(gerid_update.last_update_sijur).getTime()" class="text-danger"><i class="fa fa-3x fa-times-circle-o"></i></span>
                                                        <span v-else class="text-success"><i class="fa fa-2x fa-check-square"></i>&nbsp;</span>
                                                        <span>&nbsp;&nbsp;{{gerid_update.last_update_sijur | moment("DD/MM/YYYY HH:mm:ss")}}</span>
                                                    </td>
                                                    <td>
                                                        <span v-if = "new Date(reference_datetime).getTime() > new Date(gerid_update.last_update_sijur_es).getTime()" class="text-danger"><i class="fa fa-3x fa-times-circle-o"></i></span>
                                                        <span v-else class="text-success"><i class="fa fa-2x fa-check-square"></i>&nbsp;</span>
                                                        <span>&nbsp;&nbsp;{{gerid_update.last_update_sijur_es | moment("DD/MM/YYYY HH:mm:ss")}}</span>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div id="gc" class="tab-pane fade">
                                    <a href="#" class="btn btn-success" @click="executeUpdate(2)">Executar</a>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <table class="table table-hover">
                                                <thead>
                                                <tr>
                                                    <th class="col-md-3">
                                                        <span>Nome da atualizacao</span>
                                                        <a href="#" @click="sort($event, 'name', 'asc')"><span><i class="glyphicon glyphicon-arrow-up" aria-hidden="true"></i></span></a>
                                                        <a href="#" @click="sort($event, 'name', 'desc')"><span><i class="glyphicon glyphicon-arrow-down" aria-hidden="true"></i></span></a>
                                                    </th>
                                                    <th>Tipo</th>
                                                    <th></th>
                                                    <th>JURIRBH</th>
                                                    <th>JURIRVT</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr v-if="gerid_update.type_id == 2" v-for="(gerid_update, index) in list">
                                                    <td>{{gerid_update.name}}</td>
                                                    <td>{{gerid_update.group_code}}</td>
                                                    <td><a :href="edit_route.replace('--ID--', gerid_update.id)" class="btn btn-primary"><i class="fa fa-th-list" aria-hidden="true"></i> Detalhes</a></td>
                                                    <td>
                                                        <span v-if = "new Date(reference_datetime).getTime() > new Date(gerid_update.last_update_sijur).getTime()" class="text-danger"><i class="fa fa-3x fa-times-circle-o"></i></span>
                                                        <span v-else class="text-success"><i class="fa fa-2x fa-check-square"></i>&nbsp;</span>
                                                        <span>&nbsp;&nbsp;{{gerid_update.last_update_sijur | moment("DD/MM/YYYY HH:mm:ss")}}</span>
                                                    </td>
                                                    <td>
                                                        <span v-if = "new Date(reference_datetime).getTime() > new Date(gerid_update.last_update_sijur_es).getTime()" class="text-danger"><i class="fa fa-3x fa-times-circle-o"></i></span>
                                                        <span v-else class="text-success"><i class="fa fa-2x fa-check-square"></i>&nbsp;</span>
                                                        <span>&nbsp;&nbsp;{{gerid_update.last_update_sijur_es | moment("DD/MM/YYYY HH:mm:ss")}}</span>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div id="ga-c" class="tab-pane fade">
                                    <a href="#" class="btn btn-success" @click="executeUpdate(3)">Executar</a>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <table class="table table-hover">
                                                <thead>
                                                <tr>
                                                    <th class="col-md-3">
                                                        <span>Nome da atualizacao</span>
                                                        <a href="#" @click="sort($event, 'name', 'asc')"><span><i class="glyphicon glyphicon-arrow-up" aria-hidden="true"></i></span></a>
                                                        <a href="#" @click="sort($event, 'name', 'desc')"><span><i class="glyphicon glyphicon-arrow-down" aria-hidden="true"></i></span></a>
                                                    </th>
                                                    <th>Tipo</th>
                                                    <th></th>
                                                    <th>JURIRBH</th>
                                                    <th>JURIRVT</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr v-if="gerid_update.type_id == 3" v-for="(gerid_update, index) in list">
                                                    <td>{{gerid_update.name}}</td>
                                                    <td>{{gerid_update.group_code}}</td>
                                                    <td><a :href="edit_route.replace('--ID--', gerid_update.id)" class="btn btn-primary"><i class="fa fa-th-list" aria-hidden="true"></i> Detalhes</a></td>
                                                    <td>
                                                        <span v-if = "new Date(reference_datetime).getTime() > new Date(gerid_update.last_update_sijur).getTime()" class="text-danger"><i class="fa fa-3x fa-times-circle-o"></i></span>
                                                        <span v-else class="text-success"><i class="fa fa-2x fa-check-square"></i>&nbsp;</span>
                                                        <span>&nbsp;&nbsp;{{gerid_update.last_update_sijur | moment("DD/MM/YYYY HH:mm:ss")}}</span>
                                                    </td>
                                                    <td>
                                                        <span v-if = "new Date(reference_datetime).getTime() > new Date(gerid_update.last_update_sijur_es).getTime()" class="text-danger"><i class="fa fa-3x fa-times-circle-o"></i></span>
                                                        <span v-else class="text-success"><i class="fa fa-2x fa-check-square"></i>&nbsp;</span>
                                                        <span>&nbsp;&nbsp;{{gerid_update.last_update_sijur_es | moment("DD/MM/YYYY HH:mm:ss")}}</span>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div id="ga1-a" class="tab-pane fade">
                                    <a href="#" class="btn btn-success" @click="executeUpdate(5)">Executar</a>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <table class="table table-hover">
                                                <thead>
                                                <tr>
                                                    <th class="col-md-3">
                                                        <span>Nome da atualizacao</span>
                                                        <a href="#" @click="sort($event, 'name', 'asc')"><span><i class="glyphicon glyphicon-arrow-up" aria-hidden="true"></i></span></a>
                                                        <a href="#" @click="sort($event, 'name', 'desc')"><span><i class="glyphicon glyphicon-arrow-down" aria-hidden="true"></i></span></a>
                                                    </th>
                                                    <th>Tipo</th>
                                                    <th></th>
                                                    <th>JURIRBH</th>
                                                    <th>JURIRVT</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr v-if="gerid_update.type_id == 5" v-for="(gerid_update, index) in list">
                                                    <td>{{gerid_update.name}}</td>
                                                    <td>{{gerid_update.group_code}}</td>
                                                    <td><a :href="edit_route.replace('--ID--', gerid_update.id)" class="btn btn-primary"><i class="fa fa-th-list" aria-hidden="true"></i> Detalhes</a></td>
                                                    <td>
                                                        <span v-if = "new Date(reference_datetime).getTime() > new Date(gerid_update.last_update_sijur).getTime()" class="text-danger"><i class="fa fa-3x fa-times-circle-o"></i></span>
                                                        <span v-else class="text-success"><i class="fa fa-2x fa-check-square"></i>&nbsp;</span>
                                                        <span>&nbsp;&nbsp;{{gerid_update.last_update_sijur | moment("DD/MM/YYYY HH:mm:ss")}}</span>
                                                    </td>
                                                    <td>
                                                        <span v-if = "new Date(reference_datetime).getTime() > new Date(gerid_update.last_update_sijur_es).getTime()" class="text-danger"><i class="fa fa-3x fa-times-circle-o"></i></span>
                                                        <span v-else class="text-success"><i class="fa fa-2x fa-check-square"></i>&nbsp;</span>
                                                        <span>&nbsp;&nbsp;{{gerid_update.last_update_sijur_es | moment("DD/MM/YYYY HH:mm:ss")}}</span>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div id="-ga1-a" class="tab-pane fade">
                                    <a href="#" v-if="usr.leitura" class="btn btn-success" @click="executeUpdate(6)">Executar</a>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <table class="table table-hover">
                                                <thead>
                                                <tr>
                                                    <th class="col-md-3">
                                                        <span>Nome da atualizacao</span>
                                                        <a href="#" @click="sort($event, 'name', 'asc')"><span><i class="glyphicon glyphicon-arrow-up" aria-hidden="true"></i></span></a>
                                                        <a href="#" @click="sort($event, 'name', 'desc')"><span><i class="glyphicon glyphicon-arrow-down" aria-hidden="true"></i></span></a>
                                                    </th>
                                                    <th>Tipo</th>
                                                    <th></th>
                                                    <th>JURIRBH</th>
                                                    <th>JURIRVT</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr v-if="gerid_update.type_id == 6" v-for="(gerid_update, index) in list">
                                                    <td>{{gerid_update.name}}</td>
                                                    <td>{{gerid_update.group_code}}</td>
                                                    <td><a :href="edit_route.replace('--ID--', gerid_update.id)" class="btn btn-primary"><i class="fa fa-th-list" aria-hidden="true"></i> Detalhes</a></td>
                                                    <td>
                                                        <span v-if = "new Date(reference_datetime).getTime() > new Date(gerid_update.last_update_sijur).getTime()" class="text-danger"><i class="fa fa-3x fa-times-circle-o"></i></span>
                                                        <span v-else class="text-success"><i class="fa fa-2x fa-check-square"></i>&nbsp;</span>
                                                        <span>&nbsp;&nbsp;{{gerid_update.last_update_sijur | moment("DD/MM/YYYY HH:mm:ss")}}</span>
                                                    </td>
                                                    <td>
                                                        <span v-if = "new Date(reference_datetime).getTime() > new Date(gerid_update.last_update_sijur_es).getTime()" class="text-danger"><i class="fa fa-3x fa-times-circle-o"></i></span>
                                                        <span v-else class="text-success"><i class="fa fa-2x fa-check-square"></i>&nbsp;</span>
                                                        <span>&nbsp;&nbsp;{{gerid_update.last_update_sijur_es | moment("DD/MM/YYYY HH:mm:ss")}}</span>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div id="a1-a" class="tab-pane fade">
                                    <a href="#" class="btn btn-success" @click="executeUpdate(7)">Executar</a>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <table class="table table-hover">
                                                <thead>
                                                <tr>
                                                    <th class="col-md-3">
                                                        <span>Nome da atualizacao</span>
                                                        <a href="#" @click="sort($event, 'name', 'asc')"><span><i class="glyphicon glyphicon-arrow-up" aria-hidden="true"></i></span></a>
                                                        <a href="#" @click="sort($event, 'name', 'desc')"><span><i class="glyphicon glyphicon-arrow-down" aria-hidden="true"></i></span></a>
                                                    </th>
                                                    <th>Tipo</th>
                                                    <th></th>
                                                    <th>JURIRBH</th>
                                                    <th>JURIRVT</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr v-if="gerid_update.type_id == 7" v-for="(gerid_update, index) in list">
                                                    <td>{{gerid_update.name}}</td>
                                                    <td>{{gerid_update.group_code}}</td>
                                                    <td><a :href="edit_route.replace('--ID--', gerid_update.id)" class="btn btn-primary"><i class="fa fa-th-list" aria-hidden="true"></i> Detalhes</a></td>
                                                    <td>
                                                        <span v-if = "new Date(reference_datetime).getTime() > new Date(gerid_update.last_update_sijur).getTime()" class="text-danger"><i class="fa fa-3x fa-times-circle-o"></i></span>
                                                        <span v-else class="text-success"><i class="fa fa-2x fa-check-square"></i>&nbsp;</span>
                                                        <span>&nbsp;&nbsp;{{gerid_update.last_update_sijur | moment("DD/MM/YYYY HH:mm:ss")}}</span>
                                                    </td>
                                                    <td>
                                                        <span v-if = "new Date(reference_datetime).getTime() > new Date(gerid_update.last_update_sijur_es).getTime()" class="text-danger"><i class="fa fa-3x fa-times-circle-o"></i></span>
                                                        <span v-else class="text-success"><i class="fa fa-2x fa-check-square"></i>&nbsp;</span>
                                                        <span>&nbsp;&nbsp;{{gerid_update.last_update_sijur_es | moment("DD/MM/YYYY HH:mm:ss")}}</span>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div id="gc-cc" class="tab-pane fade">
                                    <a href="#" class="btn btn-success" @click="executeUpdate(8)">Executar</a>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <table class="table table-hover">
                                                <thead>
                                                <tr>
                                                    <th class="col-md-3">
                                                        <span>Nome da atualizacao</span>
                                                        <a href="#" @click="sort($event, 'name', 'asc')"><span><i class="glyphicon glyphicon-arrow-up" aria-hidden="true"></i></span></a>
                                                        <a href="#" @click="sort($event, 'name', 'desc')"><span><i class="glyphicon glyphicon-arrow-down" aria-hidden="true"></i></span></a>
                                                    </th>
                                                    <th>Tipo</th>
                                                    <th></th>
                                                    <th>JURIRBH</th>
                                                    <th>JURIRVT</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr v-if="gerid_update.type_id == 8" v-for="(gerid_update, index) in list">
                                                    <td>{{gerid_update.name}}</td>
                                                    <td>{{gerid_update.group_code}}</td>
                                                    <td><a :href="edit_route.replace('--ID--', gerid_update.id)" class="btn btn-primary"><i class="fa fa-th-list" aria-hidden="true"></i> Detalhes</a></td>
                                                    <td>
                                                        <span v-if = "new Date(reference_datetime).getTime() > new Date(gerid_update.last_update_sijur).getTime()" class="text-danger"><i class="fa fa-3x fa-times-circle-o"></i></span>
                                                        <span v-else class="text-success"><i class="fa fa-2x fa-check-square"></i>&nbsp;</span>
                                                        <span>&nbsp;&nbsp;{{gerid_update.last_update_sijur | moment("DD/MM/YYYY HH:mm:ss")}}</span>
                                                    </td>
                                                    <td>
                                                        <span v-if = "new Date(reference_datetime).getTime() > new Date(gerid_update.last_update_sijur_es).getTime()" class="text-danger"><i class="fa fa-3x fa-times-circle-o"></i></span>
                                                        <span v-else class="text-success"><i class="fa fa-2x fa-check-square"></i>&nbsp;</span>
                                                        <span>&nbsp;&nbsp;{{gerid_update.last_update_sijur_es | moment("DD/MM/YYYY HH:mm:ss")}}</span>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div id="-gc-a" class="tab-pane fade">
                                    <a href="#" class="btn btn-success" @click="executeUpdate(9)">Executar</a>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <table class="table table-hover">
                                                <thead>
                                                <tr>
                                                    <th class="col-md-3">
                                                        <span>Nome da atualizacao</span>
                                                        <a href="#" @click="sort($event, 'name', 'asc')"><span><i class="glyphicon glyphicon-arrow-up" aria-hidden="true"></i></span></a>
                                                        <a href="#" @click="sort($event, 'name', 'desc')"><span><i class="glyphicon glyphicon-arrow-down" aria-hidden="true"></i></span></a>
                                                    </th>
                                                    <th>Tipo</th>
                                                    <th></th>
                                                    <th>JURIRBH</th>
                                                    <th>JURIRVT</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr v-if="gerid_update.type_id == 9" v-for="(gerid_update, index) in list">
                                                    <td>{{gerid_update.name}}</td>
                                                    <td>{{gerid_update.group_code}}</td>
                                                    <td><a :href="edit_route.replace('--ID--', gerid_update.id)" class="btn btn-primary"><i class="fa fa-th-list" aria-hidden="true"></i> Detalhes</a></td>
                                                    <td>
                                                        <span v-if = "new Date(reference_datetime).getTime() > new Date(gerid_update.last_update_sijur).getTime()" class="text-danger"><i class="fa fa-3x fa-times-circle-o"></i></span>
                                                        <span v-else class="text-success"><i class="fa fa-2x fa-check-square"></i>&nbsp;</span>
                                                        <span>&nbsp;&nbsp;{{gerid_update.last_update_sijur | moment("DD/MM/YYYY HH:mm:ss")}}</span>
                                                    </td>
                                                    <td>
                                                        <span v-if = "new Date(reference_datetime).getTime() > new Date(gerid_update.last_update_sijur_es).getTime()" class="text-danger"><i class="fa fa-3x fa-times-circle-o"></i></span>
                                                        <span v-else class="text-success"><i class="fa fa-2x fa-check-square"></i>&nbsp;</span>
                                                        <span>&nbsp;&nbsp;{{gerid_update.last_update_sijur_es | moment("DD/MM/YYYY HH:mm:ss")}}</span>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="usr.edicao" id="create" role="tabpanel" aria-labelledby="create-tab" class="tab-pane fade">
                        <form :action="store_route" method="post">
                            <input type="hidden" name="_token" v-model="csrf_token">
                            <div class="col-md-12">&nbsp;</div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="col-md-2">
                                        <label for="type_id">Tipo de atualização:</label>
                                        <select name="type_id" class="form-control" @change="fillTextArea()" v-model="type_id">
                                            <option v-for="option in options" v-bind:value="option.id">{{option.group_code}}</option>
                                        </select>
                                    </div>
                                    <div class="col-md-10">
                                        <label for="name">Nome da Atualização:</label>
                                        <input ref="name" name="name" type="text" class="form-control" v-model="name" v-validate="'required|min:3|max:255'">
                                        <span v-if="errors.has('name')" class="text-danger">{{ errors.first('name') }}</span><br>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">&nbsp;</div>
                            <div class="col-md-12">
                                <div class="alert alert-info"><i>Abaixo é apresentado uma sentença padrão para personalização. <b>Não use apelidos(ALIAS) no select. Modifique os dados entre colchetes.</b></i></div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="col-md-12">
                                        <label for="select_text">Consulta:</label>
                                        <textarea name="select_text" class="form-control" rows="10" v-model="select_text" v-validate="'required'"></textarea>
                                        <span v-if="errors.has('select_text')" class="text-danger">{{ errors.first('select_text') }}</span><br>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">&nbsp;</div>
                            <div class="col-md-12">
                                <div class="alert alert-info"><i>Será feito as alterações para todos os pedientes que retornarem da consulta. <b>Modifique apenas os dados entre colchetes. Não retire o '{EXPEDIENTES_DA_CONSULTA}'</b></i></div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="col-md-12">
                                        <label for="update_text">Alteração:</label>
                                        <textarea name="update_text" class="form-control" rows="10" v-model="update_text" v-validate="'required'"></textarea>
                                        <span v-if="errors.has('update_text')" class="text-danger">{{ errors.first('update_text') }}</span><br>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">&nbsp;</div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="col-md-12">
                                        <button type="submit" title="Salvar" class="btn btn-primary" :disabled="btnSaveIsDisabled" v-confirm="{
                                            okText: 'Confirmar',
                                            cancelText: 'Cancelar',
                                            cancel: notConfirm,
                                            message: 'As setenças sql estão corretas? Somente prossiga se tiver certeza.'
                                        }"><span class="fa fa-save fa-lg"></span> Salvar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import Vue from 'vue'
  import ptBR from 'vee-validate/dist/locale/pt_BR.js'
  import VeeValidate, { Validator } from 'vee-validate'
  import VuejsDialog from 'vuejs-dialog'

  Validator.localize('pt_BR', ptBR)
  Vue.use(VeeValidate)
  Vue.use(VuejsDialog)

  export default {
    data(){
      return {
        items: [],
        usr: '',
        reference_datetime: '',
        configs: {
          orderBy: 'name',
          order: 'desc',
          filterTerm: '',
        },
        type_id: 1,
        options: [],
        name: '',
        select_text: '',
        update_text: ''
      }
    },

    props: [
      'gerid_updates_types',
      'gerid_updates',
      'csrf_token',
      'store_route',
      'edit_route',
      'execute_route',
      'user'
    ],

    mounted(){
      this.options = JSON.parse(this.gerid_updates_types)
      this.items = JSON.parse(this.gerid_updates)
      this.usr = JSON.parse(this.user)
      this.fillTextArea()
      this.reference_datetime = new Date()
      this.reference_datetime.setHours(this.reference_datetime.getHours() - 1)
    },

    computed: {
      btnSaveIsDisabled() {
        if(this.errors.has('type_id') || this.errors.has('name') || this.name.length <= 3 || this.errors.has('select_text ') || this.errors.has('update_text')){
          return true
        }
        let str = ['[NU_GRUPO_ASSUNTO]', '[NU_GRUPO_ASSUNTO(S)]', '[NU_ASSUNTO]', '[NU_ASSUNTO(S)]', '[NU_UNIDADE]', '[NU_UNIDADE(S)]']
        for(let i=0; i < str.length; i++){
          if(this.select_text.includes(str[i]) || this.update_text.includes(str[i])){
            return true
          }
        }
        return false
      },
      list() {
        let filterTerm = this.configs.filterTerm.toLowerCase()
        let list = _.orderBy(this.items, this.configs.orderBy, this.configs.order)
        if (_.isEmpty(filterTerm)) {
          this.qtde = list.length
          return list
        }
        for(var i = 0; i < list.length; i++){
          list[i].co_expedienteLower = list[i].co_expediente.toLowerCase()
          list[i].no_areaLower = list[i].no_area.toLowerCase()
          list[i].siglaLower = list[i].sigla.toLowerCase()
          list[i].nomeLower = list[i].nome.toLowerCase()
        }
        list = _.filter(list, result =>
          result.co_expedienteLower.indexOf(filterTerm) >= 0 ||
          result.no_areaLower.indexOf(filterTerm) >= 0 ||
          result.siglaLower.indexOf(filterTerm) >= 0 ||
          result.nomeLower.indexOf(filterTerm) >= 0
        )
        this.qtde = list.length
        return list
        }
    },

    methods: {
      /*********CONFIRM DIALOG**********/
      notConfirm: function(){
        event.preventDefault()
      },
      /*********************************/
      sort(ev, property, order){
        ev.preventDefault
        this.configs.orderBy = property
        this.configs.order = order
      },
      fillTextArea: function(){
        for(let i = 0; i < this.options.length; i++){
          if(this.options[i].id == this.type_id){
            this.select_text = this.options[i].select_default
            this.update_text = this.options[i].update_default
            break
          }
        }
      },
      executeUpdate: function (type_id) {
        window.location.replace(this.execute_route.replace('--TYPE_ID--', type_id))
      }
    }
  }
</script>